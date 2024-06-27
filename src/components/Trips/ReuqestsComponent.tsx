import React, { useEffect, useState } from "react";
import { Pagination, Button, Form } from "react-bootstrap";
import { TripService } from "../../services/trip.service.ts";
import {
  RequestFilter,
  Requests,
  PaginationData,
  ChangeUserStatus,
} from "../../types/types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

enum RequestStatus {
  Approved = "Approved",
  LeftFromTrip = "LeftFromTrip",
  Rejected = "Rejected",
}

interface RequestsComponentProps {
  tripId: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPaginationData: (paginationData: PaginationData) => void;
}

const RequestsComponent: React.FC<RequestsComponentProps> = ({
  tripId,
  currentPage,
  onPageChange,
  onPaginationData,
}) => {
  const [requestsData, setRequestsData] = useState<Requests>({
    requests: [],
    pagination: {
      size: 10,
      page: 0,
      current: 1,
    },
  });

  useEffect(() => {
    fetchRequests({ page: currentPage - 1, size: 10, tripId: tripId });
  }, [tripId, currentPage]);

  const fetchRequests = async (filter: RequestFilter) => {
    try {
      const response = await TripService.getTripRequests(filter);
      setRequestsData(
        response ?? {
          requests: [],
          pagination: { size: 10, page: 0, current: 1 },
        }
      );
      onPaginationData(response.pagination);
    } catch (error) {
      console.error("Ошибка при загрузке заявок: ", error);
      if (error.response && error.response.status === 400) {
        setRequestsData({
          requests: [],
          pagination: { size: 10, page: 0, current: 1 },
        });
        toast.warn("Заявок нет");
      } else {
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = event.target;
    const updatedRequests = [...requestsData.requests];
    updatedRequests[index].selectedStatus = value as RequestStatus;
    setRequestsData({ ...requestsData, requests: updatedRequests });
  };

  const changeStatus = async (requestData: ChangeUserStatus, index: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await TripService.changeStatus(requestData);
        toast.success("Статус успешно изменен!");
        fetchRequests({ page: currentPage - 1, size: 10, tripId: tripId });
      }
    } catch (error) {
      console.error("Ошибка при изменении статуса: ", error);
      toast.error("Произошла ошибка при изменении статуса.");
    }
  };
  const renderPagination = () => {
    if (!requestsData.pagination || requestsData.pagination.page <= 1) {
      return null;
    }

    return (
      <Pagination>
        {Array.from(Array(requestsData.pagination.page).keys()).map(
          (pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === requestsData.pagination.current}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    );
  };

  return (
    <div>
      {requestsData.requests.length === 0 ? (
        <p>Заявок нет</p>
      ) : (
        requestsData.requests.map((request, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <Link
                  to={`/trip/${request.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p>Посмотреть пользователя</p>
                </Link>
                <p>Статус: {request.status}</p>
                <Form.Select
                  aria-label="Выберите статус"
                  value={request.selectedStatus || ""}
                  onChange={(e) => handleStatusChange(e, index)}
                >
                  <option value={RequestStatus.Approved}>Принять</option>
                  <option value={RequestStatus.Rejected}>Отклонить</option>
                </Form.Select>
              </div>
              <Button
                variant="primary"
                onClick={() =>
                  changeStatus({
                    tripId: tripId,
                    userId: request.userId,
                    status: request.selectedStatus as RequestStatus,
                  })
                }
              >
                Применить
              </Button>
            </div>
          </div>
        ))
      )}
      {renderPagination()}
    </div>
  );
};

export default RequestsComponent;
