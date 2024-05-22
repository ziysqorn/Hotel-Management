import React from "react";
import { UsersBox } from "./UsersBox";
import { Employee_Box } from "./EmployeeBox";
import { Roles_Box } from "./RolesBox";

export const UsersInfo = ({ employees, fetchEmployees }) => {
  return (
    <div
      className="Bottom-info"
      style={{
        width: "75vw",
        height: "60vh",
        marginTop: "2%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <UsersBox />
      <Employee_Box employees={employees} fetchEmployees={fetchEmployees} />
      <Roles_Box />
    </div>
  );
};
