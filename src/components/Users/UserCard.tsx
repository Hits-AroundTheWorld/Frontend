import React from "react";
import { UserInfo } from "../../types/types.ts";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: UserInfo;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="author mt-5 mb-3 border p-3 rounded mx-auto col-md-8 d-flex align-items-center">
      <div className="author-details flex-grow-1">
        <div className="d-md-flex justify-content-between align-items-start">
          <div className="author-info flex-grow-1 order-md-1 mx-md-3">
            <a className="author-link">
              <Link to={`/user/${user.id}`}>
                <p className="author-name">{user.fullName}</p>
              </Link>
            </a>
            <p className="account-birthdate">
              Дата рождения: <span className="birthdate"> {user.birthDate}</span>
            </p>
            <p className="text-dark p-1 rounded">
              Обо мне: <span>{user.aboutMe}</span>
            </p>
            <p className="text-dark p-1 rounded">
              Страна: <span>{user.country}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
