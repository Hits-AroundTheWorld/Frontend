import { useState, useEffect } from "react";
import TripsList from "../../components/Trips/TripsList.tsx";
import TripPublicFilter from "../../components/Trips/TripPublicFilter.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { PublicTrip, Sorting, TripFilter } from "../../types/types.ts";
import { TripService } from "../../services/trip.service.ts";

const initialData: PublicTrip = {
  trips: [],
  pagination: {
    page: 1,
    size: 10,
    current: 0,
  },
};

const MainPage = () => {
  const [tripsData, setTripsData] = useState<PublicTrip | null>(initialData);
  const [filters, setFilters] = useState<TripFilter>({
    tripName: "",
    tripDate: "",
    personId: "",
    size: 10,
    requestSorting: Sorting.CreateDesc,
  });
  const fetchTrips = async () => {
    try {
      const data = await TripService.getPublicTrips(filters);
      setTripsData(data);
    } catch (error) {
      console.error("Ошибка при загрузке данных поездок", error);
      setTripsData(null);
    }
  };
  useEffect(() => {
    fetchTrips();
  }, [filters]);

  const handleFilterChange = (newFilters: TripFilter) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
    }));
  };

  return (
    <div className="container mt-4">
      <TripPublicFilter onFilterChange={handleFilterChange} />
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

export default MainPage;
