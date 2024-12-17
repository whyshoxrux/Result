import React from "react";
import users from "./mockData";
import UserCard from "./UserCard";



const Users = () => {
  return (
    <div>
      <h1>Users List</h1>
      {users.map((user, index) => (
        <UserCard
          key={index}
          firstName={user.firstName}
          lastName={user.lastName}
        />
      ))}
    </div>
  );
};

export default Users;
