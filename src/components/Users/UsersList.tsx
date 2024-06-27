import React from "react";
import { AllUsers } from "../../types/types.ts";
import UserCard from "./UserCard";

interface UsersListProps {
  usersData: AllUsers;
}

const UsersList: React.FC<UsersListProps> = ({ usersData }) => {
  return (
    <div className="container mt-4">
      {usersData.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
