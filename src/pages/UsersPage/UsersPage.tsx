import React, { useEffect, useState } from "react";
import UsersList from "../../components/Users/UsersList";
import UserFilter from "../../components/Users/UserFilter";
import UserPagePagination from "../../components/Pagination/UserPagePagination";
import { AllUsers, UsersFilter } from "../../types/types";
import { AuthService } from "../../services/auth.service";

const UsersPage: React.FC = () => {
  const [usersData, setUsersData] = useState<AllUsers | null>(null);
  const [filters, setFilters] = useState<UsersFilter>({
    fullName: "",
    email: "",
    country: "",
    maxAge: undefined,
    minAge: undefined,
    size: 10,
    page: 1,
  });

  const getUsers = async () => {
    try {
      const data = await AuthService.fetchUsers(filters);
      if (data) {
        const updatedData = {
          ...data,
          users: data.users.map((user) => ({
            ...user,
            birthDate: new Date(user.birthDate).toISOString().split("T")[0],
          })),
        };
        setUsersData(updatedData);
      } else {
        setUsersData(null);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователей", error);
      setUsersData(null);
    }
  };

  useEffect(() => {
    getUsers();
  }, [filters]);

  const handleFilterChange = (newFilters: UsersFilter) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
    }));
  };

  return (
    <div className="container mt-4">
      <UserFilter onFilterChange={handleFilterChange} />
      {usersData && usersData.users.length > 0 ? (
        <>
          <UsersList usersData={usersData} />
          <UserPagePagination
            data={usersData}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <p className="text-center display-4 fw-bold">Нет пользователей</p>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
