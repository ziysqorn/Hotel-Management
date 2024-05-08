import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UsersBox } from "./UsersBox";
import { Employee_Box } from "./EmployeeBox";
import { Roles_Box } from "./RolesBox";

export const UsersInfo = () => {
  return (
    <div
      className="Bottom-info"
      style={{
        width: "100%",
        height: "75%",
        marginTop: "2%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <UsersBox />
      <Employee_Box />
      <Roles_Box />
    </div>
  );
};
