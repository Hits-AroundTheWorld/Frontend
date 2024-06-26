import React, { useState } from "react";
import { Sorting, MyTripsFilter } from "../../types/types";

interface TripMyFilterProps {
  onFilterChange: (filters: MyTripsFilter) => void;
}

const TripMyFilter: React.FC<TripMyFilterProps> = ({ onFilterChange }) => {
  const initialFilters: MyTripsFilter = {
    tripName: "",
    tripDate: "",
    isOwner: true,
    size: 10,
    page: 1,
    requestSorting: Sorting.CreateDesc,
  };

  const [filters, setFilters] = useState<MyTripsFilter>(initialFilters);

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

    const filteredFilters: MyTripsFilter = {
      tripName: filters.tripName,
      tripDate: filters.tripDate,
      isOwner: filters.isOwner,
      size: filters.size,
      page: filters.page,
      requestSorting: filters.requestSorting,
    };

    onFilterChange(filteredFilters);
  };

  return (
    <div className="container mt-3 justify-content-center">
      <form
        className="row g-3 mx-auto border p-2 rounded"
        id="filterForm"
        onSubmit={handleSubmit}
      >
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="tripName" className="form-label">
            Имя поездки
          </label>
          <input
            type="text"
            className="form-control"
            id="tripName"
            name="tripName"
            value={filters.tripName}
            onChange={handleChange}
            placeholder="Введите имя поездки"
          />
        </div>
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="tripDate" className="form-label">
            Дата начала
          </label>
          <input
            type="date"
            className="form-control"
            id="tripDate"
            name="tripDate"
            value={filters.tripDate}
            onChange={handleChange}
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
        <div className="col-md-6 border p-3 rounded">
          <label htmlFor="requestSorting" className="form-label">
            Сортировка
          </label>
          <select
            id="requestSorting"
            className="form-select"
            name="requestSorting"
            value={filters.requestSorting}
            onChange={handleChange}
          >
            <option value={Sorting.CreateDesc}>
              Время создания по убыванию
            </option>
            <option value={Sorting.CreateAsc}>
              Время создания по возрастанию
            </option>
          </select>
        </div>
        <div className="col-md-12 border p-4 rounded d-flex align-items-center">
          <label htmlFor="isOwner" className="form-label mb-0">
            Мои поездки
          </label>
          <input
            type="checkbox"
            className="form-check-input ms-2"
            id="isOwner"
            name="isOwner"
            checked={filters.isOwner}
            onChange={handleChange}
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

export default TripMyFilter;
