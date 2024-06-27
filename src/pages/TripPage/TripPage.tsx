import React, { useEffect, useState } from "react";
import MapComponent, { IPlaceMark } from "../../components/Map/Map";
import {
  Row,
  Col,
  Spinner,
  Card,
  OverlayTrigger,
  Tooltip,
  Nav,
  Container,
} from "react-bootstrap";
import { instance } from "../../api/axios.api.ts";
import { useParams } from "react-router-dom";
import RequestsComponent from "../../components/Trips/ReuqestsComponent.tsx";
import MembersComponent from "../../components/Trip/MembersComponent.tsx";
import Pagination from "react-bootstrap/Pagination";
import { UserProfile } from "../../types/types";
import { AuthService } from "../../services/auth.service.ts";
interface ITripData {
  trip?: ITrip;
  mapPoints?: IPlaceMark[];
}
interface ITrip {
  tripId: string;
  tripName: string;
  tripMiniDescription: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  tripFounderId: string;
  tripFounderFullName: string;
  invitationLink: string;
  maxBudget: number;
  maxPeopleCount: number;
  peopleCountNow: number;
  createdTime: string;
}

const TripInfo = ({ trip }: { trip: ITrip }) => {
  return (
    <Card border="light" className="mt-2">
      <Card.Body>
        <Row className="px-3 d-flex justify-content-between">
          <Card.Title className="me-auto">{trip.tripName}</Card.Title>
          <Card.Subtitle>
            {trip.peopleCountNow}/{trip.maxPeopleCount}
          </Card.Subtitle>
        </Row>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(trip.startDate).toLocaleDateString()} -{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text className="mb-1">
          Описание: {trip.tripMiniDescription}
        </Card.Text>
        <Card.Text className="mb-1">
          Организатор: {trip.tripFounderFullName}
        </Card.Text>
        <Card.Text className="mb-1">
          Максимальный бюджет: {trip.maxBudget}₸
        </Card.Text>
        <Row className="px-3">
          <Card.Text className="mb-1">Пригласить: </Card.Text>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="button-tooltip">Нажмите для копирования</Tooltip>
            }
          >
            <Card.Text
              className="mb-1"
              onClick={() => {
                navigator.clipboard.writeText(trip.invitationLink);
              }}
              style={{ cursor: "pointer" }}
            >
              {trip.invitationLink}
            </Card.Text>
          </OverlayTrigger>
        </Row>
      </Card.Body>
    </Card>
  );
};

const TripPage = () => {
  const [tripData, setTripData] = useState<ITripData>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("timeIntervals");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState<any>(null);
  const [getUserId, setGetUserId] = useState<string>();
  const [isOwner, setIsOwner] = useState<Boolean>();
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await instance.get(`/api/trip/${id}`);
        setTripData(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTripData();
  }, [id]);

  const getProfileHandler = async () => {
    try {
      const data = await AuthService.getProfile();
      if (data) {
        setGetUserId(data.id);
        setIsOwner(data.id === tripData.trip?.tripFounderId);
      }
    } catch (error) {
      console.error("Ошибка при загрузке профиля: ", error);
    }
  };

  useEffect(() => {
    getProfileHandler();
  }, []);
  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePaginationData = (data: any) => {
    setPaginationData(data);
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row>
          <Col xs={12} sm={12} md={12} xl={6} xxl={6}>
            <MapComponent parentId={id} placemarks={tripData.mapPoints} />
            <TripInfo trip={tripData.trip} />
          </Col>
          <Col xs={12} sm={12} md={12} xl={6} xxl={6}>
            <Nav
              justify
              variant="tabs"
              activeKey={activeTab}
              onSelect={handleSelect}
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <Nav.Item>
                <Nav.Link eventKey="timeIntervals">План поездки</Nav.Link>
              </Nav.Item>
              {tripData.trip?.tripFounderId === getUserId && (
                <Nav.Item>
                  <Nav.Link eventKey="applications">Заявки</Nav.Link>
                </Nav.Item>
              )}
              {tripData.trip?.tripFounderId === getUserId && (
                <Nav.Item>
                  <Nav.Link eventKey="members">Участники</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
            <Container>
              {activeTab === "timeIntervals" && <div> План</div>}
              {tripData.trip?.tripFounderId === getUserId &&
                activeTab === "applications" && (
                  <>
                    <RequestsComponent
                      tripId={id}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      onPaginationData={handlePaginationData}
                    />
                    {paginationData && (
                      <Pagination>
                        {Array.from(Array(paginationData.page).keys()).map(
                          (pageNumber) => (
                            <Pagination.Item
                              key={pageNumber + 1}
                              active={pageNumber + 1 === paginationData.current}
                              onClick={() => handlePageChange(pageNumber + 1)}
                            >
                              {pageNumber + 1}
                            </Pagination.Item>
                          )
                        )}
                      </Pagination>
                    )}
                  </>
                )}
              {activeTab === "members" && <MembersComponent tripId={id} />}
            </Container>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TripPage;
