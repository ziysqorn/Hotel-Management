import React from "react";
import { useState } from "react";
import { AddRolesModal } from "./Modal/AddRolesModal";
import "./Design.css";
import { Roles_List } from "./RolesList";

export const Roles_Box = () => {
  const [isAddRolesOpen, setIsAddRolesOpen] = useState(false);
  return (
    <div
      className="Roles-Box"
      style={{
        width: "20vw",
        borderRadius: 10,
        background: "#2E2E2E",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", margin: "3%" }}>
        <div
          style={{
            color: "white",
            fontSize: "1vw",
            fontWeight: "bold",
            margin: "3%",
            width: "65%",
          }}
        >
          Roles
        </div>
        <div
          className="BtnAddRoles"
          style={{
            background: "#00FFF5",
            borderRadius: 10,
            padding: "3%",
            fontSize:"1vw",
            fontWeight:600,
            width: "30%",
            margin: "3%",
            cursor: "pointer",
          }}
          onClick={() => setIsAddRolesOpen(true)}
        >
          + Add
        </div>
      </div>
      <Roles_List />
      <AddRolesModal
        isAddRolesOpen={isAddRolesOpen}
        onAddRolesClose={() => setIsAddRolesOpen(false)}
      />
    </div>
  );
};
