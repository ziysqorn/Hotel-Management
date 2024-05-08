import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteConfirm } from "./Modal/DeleteConfirm";
import { AddEmployeeModal } from "./Modal/AddEmployee";
import "./Design.css";

export const Total_Info = () => {
  const [totalEmployees, setTotalEmployees] = useState(0); //đếm tổng sô nhân viên
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/employee/totalemployee"
        );
        setTotalEmployees(response.data.totalEmployees);
      } catch (error) {
        console.error("Error fetching total employees:", error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/employee/employ/totaluser"
        );
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalEmployees();
    fetchTotalUsers();
  }, []);

  const [isAddEmployOpen, setIsAddEmployOpen] = useState(false);
  const [deleteWindow, setdeleteWindow] = useState(false);
  return (
    <div
      className="Top-info"
      style={{ width: "75vw", height: "15vh", display: "flex" }}
    >
      <div
        className="Total-bar"
        style={{
          width: "56vw",
          background: "#2E2E2E",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <div
          className="Total-employee"
          style={{
            color: "white",
            Width: "15vw",
            height: "6vh",
            background: "black",
            padding: "2%",
            paddingRight: "9%",
            borderRadius: 10,
          }}
        >
          <div style={{ fontSize: "14px" }}>Total Employee</div>
          <div style={{ fontSize: "20px", margin: "2%" }}>{totalEmployees}</div>
        </div>
        <div
          className="Total-User"
          style={{
            color: "white",
            Width: "15vw",
            height: "6vh",
            background: "black",
            padding: "2%",
            paddingRight: "9%",
            borderRadius: 10,
          }}
        >
          <div style={{ fontSize: "14px" }}>Total Users</div>
          <div style={{ fontSize: "20px", margin: "2%" }}>{totalUsers}</div>
        </div>
        <div
          className="Total-Position"
          style={{
            color: "white",
            Width: "15vw",
            height: "6vh",
            background: "black",
            padding: "2%",
            paddingRight: "9%",
            borderRadius: 10,
          }}
        >
          <div style={{ fontSize: "14px" }}>Total Position</div>
          <div style={{ fontSize: "20px", margin: "2%" }}>1500</div>
        </div>
      </div>
      <div
        className="Button-Container"
        style={{
          width: "15vw",
          paddingLeft: "2%",
          paddingTop: "1%",
          background: "black",
          borderRadius: 10,
        }}
      >
        <div
          className="Btn-add"
          style={{
            color: "#00FFF5",
            background: "black",
            border: "2px #00FFF5 solid",
            borderRadius: 10,
            height: "6vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "5px",
            cursor: "pointer",
          }}
          onClick={() => setIsAddEmployOpen(true)}
        >
          + Add Employees
        </div>

        <div
          className="Btn-remove"
          style={{
            color: "#FF2A2A",
            background: "black",
            border: "2px #FF2A2A solid",
            borderRadius: 10,
            height: "6vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          mode="delete-employee"
          onClick={() => setdeleteWindow(true)}
        >
          Remove Employees
        </div>
      </div>
      <AddEmployeeModal
        AddEmployeeIsOpen={isAddEmployOpen}
        AddEmployeeOnClose={() => setIsAddEmployOpen(false)}
      />
      <DeleteConfirm
        isDelWindowOpen={deleteWindow}
        onDelWindowClose={() => setdeleteWindow(false)}
      />
    </div>
  );
};
