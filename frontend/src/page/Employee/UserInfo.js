import React from "react";
import { UsersBox } from "./UsersBox";
import { Employee_Box } from "./EmployeeBox";
import { Roles_Box } from "./RolesBox";

export const UsersInfo = ({ employees, fetchEmployees, users, fetchUsers }) => {
  console.log("Users prop in UsersInfo:", users); // Add this line
  return (
    <div
      className="Bottom-info"
      style={{
        width: "100%",
        height: "60vh",
        marginTop: "2%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <UsersBox users={users} fetchUsers={() => fetchUsers()} />
      <Employee_Box
        employees={employees}
        fetchEmployees={() => fetchEmployees()}
      />
      <Roles_Box />
    </div>
  );
};
