import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { UsersInfo } from "./UserInfo";
import { Total_Info } from "./TotalInfo";

export const EmployeesPage = () => {
  //load ds nhanvien từ file cha
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/employee/");
      setEmployees(response.data.recordset);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

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
        <UsersInfo employees={employees} fetchEmployees={fetchEmployees} /> {/* truyền dữ liệu xuống con */}
      </div>
    </>
  );
};
