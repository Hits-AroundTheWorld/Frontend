import React from "react";
import { ITripData } from "../../pages/TripPage/TripPage";

interface PaginationProps {
  tripsData: ITripData;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  tripsData,
  onPageChange,
}) => {
  if (!tripsData.trip || tripsData.trip.peopleCountNow === 0) {
    return null;
  }

  const totalPages = Math.ceil(
    tripsData.trip.peopleCountNow / tripsData.trip.maxPeopleCount
  );
  const currentPage = tripsData.trip.pagination.current;

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav
      aria-label="Page navigation example"
      className="d-flex justify-content-center mt-3"
    >
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            aria-label="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
          >
            <a
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
