import React from "react";
import { PublicTrip } from "../../types/types";

interface PaginationProps {
  tripsData: PublicTrip;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ tripsData, onPageChange }) => {
  if (!tripsData || tripsData.pagination.current === 0) {
    return null;
  }

  const totalPages = Math.ceil(
    tripsData.pagination.current / tripsData.pagination.size
  );
  const currentPage = tripsData.pagination.page;

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

export default Pagination;
