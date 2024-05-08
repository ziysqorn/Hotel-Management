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
          fontSize: "1vw",
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
              fontSize: "0.8vw",
              paddingLeft: "5px",
              width: "5vw",
            }}
          />
          <input
            type="text"
            style={{
              background: "black",
              border: "none",
              width: "100%",
              borderRadius: 5,
              fontSize: "0.7vw",
              outline: "none",
              color: "white",
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
            marginRight: "2%",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faFilter} />
          <select
            style={{
              fontWeight: "bold",
              height: "100%",
              width: "100%",
              background: "#3E3E3E",
              fontSize: "100%",
              outline: "none",
              color: "white",
              border: "none",
            }}
          >
            <option value="">Filter</option>
            <option value="option1">A - Z</option>
            <option value="option2">Z - A</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
      <EmployeesList />
    </div>
  );
};
