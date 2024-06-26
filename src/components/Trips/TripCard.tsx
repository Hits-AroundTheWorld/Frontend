import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TripModel, UserProfile } from "../../types/types";
import { TripService } from "../../services/trip.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MyRequests, UserRequestStatus } from "../../types/types.ts";
import { AuthService } from "../../services/auth.service.ts";

interface TripCardProps {
  trip: TripModel;
}

const TripCard = ({ trip }: TripCardProps) => {
  const [hasApplied, setHasApplied] = useState(false);
  const [requestStatus, setRequestStatus] = useState<UserRequestStatus | null>(
    null
  );
  const [getUserId, setGetUserId] = useState<string>();

  const fetchUserRequests = async () => {
    try {
      const userRequests: MyRequests[] = await TripService.getMyRequests();
      const userRequest = userRequests.find(
        (req) => req.tripId === trip.tripId
      );
      if (userRequest) {
        setRequestStatus(userRequest.status);
        setHasApplied(true);
      } else {
        setRequestStatus(null);
        setHasApplied(false);
      }
    } catch (error) {
      console.error("Error fetching user requests:", error);
      toast.error("Ошибка при получении заявок пользователя");
    }
  };
  const getProfileHandler = async () => {
    try {
      const data = await AuthService.getProfile();
      if (data) {
        setGetUserId(data.id);
      }
    } catch (error) {
      toast.error("Произошла ошибка при получении профиля");
    }
  };
  useEffect(() => {
    fetchUserRequests();
    getProfileHandler();
  }, [trip.tripId]);

  const applyToTrip = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await TripService.applyToTrip(id);
        toast.success("Заявка успешно подана!");
        setHasApplied(true);
        setRequestStatus(UserRequestStatus.InQueue);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при подаче на поездку");
    }
  };

  const cancelApplication = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await TripService.cancelTripApplication(id);
        toast.success("Заявка успешно отменена!");
        setHasApplied(false);
        setRequestStatus(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при отмене заявки на поездку");
    }
  };

  const leaveTrip = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await TripService.leaveFromTrip(id);
        toast.success("Вы успешно покинули поездку!");
        setHasApplied(false);
        setRequestStatus(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при покидании поездки");
    }
  };

  return (
    <Row className="mb-3 justify-content-center">
      <Col md={8}>
        <Card className="border p-3 rounded" style={{ width: "100%" }}>
          <Card.Body>
            <Row className="d-flex justify-content-between align-items-start">
              <Col>
                <Card.Title style={{ wordBreak: "break-all" }}>
                  <Link
                    to={`/trip/${trip.tripId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {trip.tripName}
                  </Link>
                </Card.Title>
              </Col>
              <Col xs="auto">
                <Card.Text
                  style={{
                    color: trip.isPublic ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {trip.isPublic ? "Публичная" : "Частная"}
                </Card.Text>
              </Col>
            </Row>
            <Card.Text
              style={{
                fontWeight: "bold",
                color:
                  trip.maxPeopleCount - trip.peopleCountNow !== 0
                    ? "red"
                    : "inherit",
              }}
            >
              Осталось мест: {trip.maxPeopleCount - trip.peopleCountNow}
            </Card.Text>
            <Card.Text>
              Краткое описание поездки: {trip.tripMiniDescription}
            </Card.Text>
            <Card.Text>
              Дата начала поездки:{" "}
              {new Date(trip.startDate).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              Дата конца поездки: {new Date(trip.endDate).toLocaleDateString()}
            </Card.Text>
            <Card.Text className="text-muted mt-2">
              Максимальный бюджет:{" "}
              <span style={{ fontSize: "0.9em" }}>{trip.maxBudget}</span>
            </Card.Text>
            <Card.Text className="text-muted">
              Максимальное количество людей:{" "}
              <span style={{ fontSize: "0.9em" }}>{trip.maxPeopleCount}</span>
            </Card.Text>
            {trip.tripFounderId != getUserId && (
              <div className="d-flex justify-content-start">
                {hasApplied && requestStatus === UserRequestStatus.InQueue && (
                  <Button
                    variant="danger"
                    onClick={() => cancelApplication(trip.tripId)}
                  >
                    Отменить заявку
                  </Button>
                )}
                {hasApplied && requestStatus === UserRequestStatus.Approved && (
                  <Button
                    variant="secondary"
                    onClick={() => leaveTrip(trip.tripId)}
                  >
                    Покинуть поездку
                  </Button>
                )}
                {!hasApplied && (
                  <Button
                    variant="primary"
                    onClick={() => applyToTrip(trip.tripId)}
                  >
                    Подать на поездку
                  </Button>
                )}
              </div>
            )}
            {trip.tripFounderId == getUserId && (<div className="d-flex justify-content-start">
                  <Button
                    variant="danger"
                    onClick={() => cancelApplication(trip.tripId)}
                  >
                    Удалить поездку
                  </Button>
              </div>)}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TripCard;
