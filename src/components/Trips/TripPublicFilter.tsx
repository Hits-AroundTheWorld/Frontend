import React, { useState } from "react";
import { Sorting, TripFilter } from "../../types/types";

interface TripPublicFilterProps {
  onFilterChange: (filters: TripFilter) => void;
}

const TripPublicFilter: React.FC<TripPublicFilterProps> = ({
  onFilterChange,
}) => {
  const initialFilters: TripFilter = {
    tripName: "",
    tripDate: "",
    personId: "",
    size: 10,
    requestSorting: Sorting.CreateDesc,
  };

  const [filters, setFilters] = useState<TripFilter>(initialFilters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredFilters: TripFilter = {
      tripName: filters.tripName,
      tripDate: filters.tripDate,
      personId: filters.personId,
      size: filters.size,
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
            id="sortOrequestSortingrder"
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
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Применить фильтры
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripPublicFilter;
