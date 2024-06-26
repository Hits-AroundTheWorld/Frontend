import React from "react";
import { AllUsers } from "../../types/types.ts";

interface PaginationProps {
  data: AllUsers | null;
  onPageChange: (page: number) => void;
}

const UserPagePagination: React.FC<PaginationProps> = ({
  data,
  onPageChange,
}) => {
  if (!data || data.users.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(data.pagination.current / data.pagination.size);
  const currentPage = data.pagination.page;

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
          <button
            className="page-link"
            aria-label="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            aria-label="Next"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserPagePagination;
