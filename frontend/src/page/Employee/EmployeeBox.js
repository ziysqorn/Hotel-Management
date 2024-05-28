import React from "react";
import "./Design.css";
import { useState } from "react";
import axios from "axios";
import { EmployeesList } from "./EmployeesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

export const Employee_Box = ({ employees, fetchEmployees }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/employee/query?query=${searchTerm}`
      );
      setFilteredEmployees(response.data.recordset);
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div
      className="Employee-box"
      style={{
        width: "32vw",
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
            width: "18vw",
            paddingLeft: "3px",
            height: "6vh",
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
              fontSize: "1vw",
              paddingLeft: "5px",
              width: "5vw",
            }}
          />
          <input
            type="text"
            style={{
              background: "black",
              color: "white",
              border: "none",
              width: "100%",
              borderRadius: 5,
              fontSize: "1vw",
              outline: "none",
              color: "white",
            }}
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
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
      <EmployeesList
        employees={filteredEmployees.length > 0 ? filteredEmployees : employees}
      />
    </div>
  );
};
