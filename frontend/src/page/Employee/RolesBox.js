import React from "react";
import "./Design.css";
import { Roles_List } from "./RolesList";

export const Roles_Box = () => {
  return (
    <div
      className="Roles-Box"
      style={{
        width: "25%",
        background: "#2E2E2E",
        borderRadius: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", margin: "3%" }}>
        <div
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            margin: "3%",
            width: "65%",
          }}
        >
          Roles
        </div>
        <div
          className="BtnAddUser"
          style={{
            background: "#00FFF5",
            borderRadius: 10,
            padding: "3%",
            width: "30%",
            margin: "3%",
            cursor: "pointer",
          }}
          onClick={() => console.log("added")}
        >
          + Add
        </div>
      </div>
      <Roles_List />
    </div>
  );
};
