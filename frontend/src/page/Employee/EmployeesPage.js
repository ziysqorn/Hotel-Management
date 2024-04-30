import React from "react";
import { UsersInfo } from "./UserInfo";
import { Total_Info } from "./TotalInfo";

export const EmployeesPage = () => {
  return (
    <>
      <div
        className="Container"
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Total_Info />
        <UsersInfo />
      </div>
    </>
  );
};
