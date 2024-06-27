import React, { useState } from "react";
import { UsersFilter } from "../../types/types";

interface UserFilterProps {
  onFilterChange: (filters: UsersFilter) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilterChange }) => {
  const initialFilters: UsersFilter = {
    fullName: "",
    email: "",
    country: "",
    maxAge: undefined,
    minAge: undefined,
    size: 10,
    page: 1,
  };

  const [filters, setFilters] = useState<UsersFilter>(initialFilters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const filterValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: filterValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };
  return (
    <div className="container mt-3 justify-content-center">
      <form
        className="row g-3 mx-auto border p-2 rounded"
        id="filterForm"
        onSubmit={handleSubmit}
      >
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="fullName" className="form-label">
            Полное имя
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={filters.fullName}
            onChange={handleChange}
            placeholder="Введите полное имя"
          />
        </div>
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={filters.email}
            onChange={handleChange}
            placeholder="Введите email"
          />
        </div>
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="country" className="form-label">
            Страна
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={filters.country}
            onChange={handleChange}
            placeholder="Введите страну"
          />
        </div>
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="maxAge" className="form-label">
            Максимальный возраст
          </label>
          <input
            type="number"
            className="form-control"
            id="maxAge"
            name="maxAge"
            value={filters.maxAge ?? ""}
            onChange={handleChange}
            placeholder="Введите максимальный возраст"
          />
        </div>
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="minAge" className="form-label">
            Минимальный возраст
          </label>
          <input
            type="number"
            className="form-control"
            id="minAge"
            name="minAge"
            value={filters.minAge ?? ""}
            onChange={handleChange}
            placeholder="Введите минимальный возраст"
          />
        </div>
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="size" className="form-label">
            Размер страницы
          </label>
          <input
            type="number"
            className="form-control"
            id="size"
            name="size"
            value={filters.size}
            onChange={handleChange}
            placeholder="Введите размер страницы"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Применить фильтры
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFilter;
