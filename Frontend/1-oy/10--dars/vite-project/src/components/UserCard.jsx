import React from "react";
import { message } from "antd";

const UserCard = ({ firstName, lastName }) => {
  const handleClick = () => {
    message.info(`Last Name: ${lastName}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      {firstName}
    </div>
  );
};

export default UserCard;
  