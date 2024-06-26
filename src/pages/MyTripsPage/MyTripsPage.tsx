import React, { useState, useEffect } from "react";
import TripsList from "../../components/Trips/TripsList";
import TripMyFilter from "../../components/Trips/TripsMyFilter.tsx";
import Pagination from "../../components/Pagination/Pagination";
import CreateTripModal from "../../components/Trips/CreateTripModal";
import EnterInviteCodeModal from "../../components/Trips/EnterInviteCodeModal";
import {
  PublicTrip,
  Sorting,
  MyTripsFilter,
  CreateTripModal as CreateTripModalType,
  InviteCode,
} from "../../types/types";
import { TripService } from "../../services/trip.service";

const initialData: PublicTrip = {
  trips: [],
  pagination: {
    page: 1,
    size: 10,
    current: 0,
  },
};

const MyTripsPage = () => {
  const [tripsData, setTripsData] = useState<PublicTrip | null>(initialData);
  const [filters, setFilters] = useState<MyTripsFilter>({
    tripName: "",
    tripDate: "",
    isOwner: true,
    size: 10,
    page: 1,
    requestSorting: Sorting.CreateDesc,
  });

  const [showCreateTripModal, setShowCreateTripModal] = useState(false);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState(false);

  const fetchTrips = async () => {
    try {
      const data = await TripService.getMyTrips(filters);
      setTripsData(data);
    } catch (error) {
      console.error("Ошибка при загрузке данных поездок", error);
      setTripsData(null);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [filters]);

  const handleFilterChange = (newFilters: MyTripsFilter) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
    }));
  };

  const handleSaveTrip = async (tripData: CreateTripModalType) => {
    setShowCreateTripModal(false);
    await fetchTrips();
  };

  const handleJoinTrip = async (inviteCodeData: InviteCode) => {
    setShowInviteCodeModal(false);
    await fetchTrips();
  };

  return (
    <div className="container mt-4">
      <TripMyFilter onFilterChange={handleFilterChange} />
      <div className="mt-3 mb-3 d-flex justify-content-center">
        <button
          className="btn btn-primary me-2"
          onClick={() => setShowCreateTripModal(true)}
        >
          Создать поездку
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowInviteCodeModal(true)}
        >
          Войти по коду
        </button>
      </div>
      <CreateTripModal
        show={showCreateTripModal}
        handleClose={() => setShowCreateTripModal(false)}
        handleSave={handleSaveTrip}
        fetchTrips={fetchTrips}
      />
      <EnterInviteCodeModal
        show={showInviteCodeModal}
        handleClose={() => setShowInviteCodeModal(false)}
        handleJoin={handleJoinTrip}
        fetchTrips={fetchTrips}
      />
      <div style={{ marginTop: "10px" }}>
        {tripsData && tripsData.trips.length > 0 ? (
          <>
            <TripsList tripsData={tripsData} fetchTrips={fetchTrips} />
            <Pagination tripsData={tripsData} onPageChange={handlePageChange} />
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <p className="text-center display-4 fw-bold">Таких поездок нет</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTripsPage;
