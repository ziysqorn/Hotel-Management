import React from "react";
import "./Design.css";
import { EmployeesList } from "./EmployeesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

export const Employee_Box = () => {
  return (
    <div
      className="Employee-box"
      style={{
        width: "25.5vw",
        color: "pink",
        background: "#2E2E2E",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          margin: "3%",
        }}
      >
        Employees
      </div>
      <div
        className="employee-searchbar"
        style={{
          height: "6vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          className="Search"
          style={{
            borderRadius: 5,
            background: "black",
            width: "15vw",
            paddingLeft: "3px",
            height: "5vh",
            display: "flex",
            alignItems: "center",
            marginRight: "5px",
            marginLeft: "5px",
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: "white",
              fontSize: 13,
              paddingLeft: "5px",
              width: "5vw",
            }}
          />
          <input
            type="text"
            style={{
              background: "black",
              border: "black solid 2px",
              width: "15vw",
              borderRadius: 5,
            }}
            placeholder="Search ..."
          />
        </div>
        <div
          className="employee-filter"
          style={{
            color: "white",
            background: "#3E3E3E",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "3%",
            borderRadius: 10,
            cursor: "pointer",
          }}
          onClick={() => console.log("order by")}
        >
          <FontAwesomeIcon icon={faFilter} />
          <div style={{ marginLeft: "6px" }}>Filter</div>
        </div>
      </div>
      <EmployeesList />
    </div>
  );
};
