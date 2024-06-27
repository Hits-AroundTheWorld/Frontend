import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { UserProfile, ChangeUserStatus } from "../../types/types.ts";
import { TripService } from "../../services/trip.service.ts";
import { toast } from "react-toastify";

enum MemberStatus {
  LeftFromTrip = "LeftFromTrip",
}

interface MembersComponentProps {
  tripId: string;
  isOwner: boolean;
}

const MembersComponent: React.FC<MembersComponentProps> = ({
  tripId,
  isOwner,
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);

  const fetchTripMembers = async () => {
    try {
      const userRequests: UserProfile[] = await TripService.getTripMembers(
        tripId
      );
      setUsers(userRequests);
    } catch (error) {
      console.error("Ошибка при загрузке участников: ", error);
    }
  };

  useEffect(() => {
    fetchTripMembers();
  }, []);

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = event.target;
    const updatedUsers = [...users];
    updatedUsers[index].selectedStatus = value as MemberStatus;
    setUsers(updatedUsers);
  };

  const changeStatus = async (requestData: ChangeUserStatus, index: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await TripService.changeStatus(requestData);
        toast.success("Статус успешно изменен!");
        fetchTripMembers();
      }
    } catch (error) {
      console.error("Ошибка при изменении статуса: ", error);
      toast.error("Произошла ошибка при изменении статуса.");
    }
  };

  return (
    <Card border="light" className="mt-2">
      <Card.Body>
        {users.length === 0 ? (
          <p>Нет участников</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p>Пользователь: {user.fullName}</p>
                  <p>Email: {user.email}</p>
                  <Form.Select
                    aria-label="Выберите статус"
                    value={user.selectedStatus || ""}
                    onChange={(e) => handleStatusChange(e, index)}
                  >
                    <option value={MemberStatus.LeftFromTrip}>
                      Удалить из поездки
                    </option>
                  </Form.Select>
                </div>
                <Button
                  variant="primary"
                  onClick={() =>
                    changeStatus({
                      tripId: tripId,
                      userId: user.id,
                      status: user.selectedStatus as MemberStatus,
                    })
                  }
                >
                  Применить
                </Button>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default MembersComponent;
