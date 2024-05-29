import React from "react";
import { useState } from "react";
import axios from "axios";
import { faX, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CreateUserModal = ({ isCUserOpen, isCUserClose, fetchUsers }) => {
  const [employeeId, setEmployeeId] = useState("");
  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/employee/employ/createUser",
        { item: { EmployeeId: employeeId } }
      );
      alert(response.data); // Thông báo thành công
      isCUserClose();
      fetchUsers(); // Cập nhật danh sách người dùng
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };
  if (!isCUserOpen) return null;
  return (
    <div
      className="animate__animated animate__zoomIn"
      style={{
        position: "absolute",
        top: "20%",
        left: "35%",
        width: "33vw",
        height: "23vw",
        borderRadius: 10,
        background: "#2E2E2E",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display: "flex", width: "65%", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ marginRight: "5%" }}
            />
            <div style={{ fontSize: "150%" }}>Add Users</div>
          </div>
          <FontAwesomeIcon
            icon={faX}
            className="faX"
            style={{ fontSize: "90%", cursor: "pointer" }}
            onClick={() => isCUserClose(false)}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            justifyContent: "space-around",
          }}
        >
          <div style={{ width: "90%", height: "20%" }}>
            <div style={{ color: "white", fontSize: "90%", height: "20%" }}>
              Employee ID
            </div>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={{
                width: "100%",
                height: "90%",
                color: "white",
                marginTop: "3%",
                marginBottom: "3%",
                background: "#111111",
                border: "solid #111111 1px",
                borderRadius: 5,
              }}
            />
          </div>
          <div style={{ width: "90%", height: "20%" }}>
            <div style={{ color: "white", fontSize: "90%", height: "20%" }}>
              Description
            </div>
            <input
              type="text"
              style={{
                width: "100%",
                height: "90%",
                color: "white",
                marginTop: "3%",
                marginBottom: "3%",
                background: "#111111",
                border: "solid #111111 1px",
                borderRadius: 5,
              }}
            />
          </div>
          <div
            style={{
              color: "white",
              width: "40%",
              fontSize: "120%",
              padding: "3%",
              marginTop: "3%",
              borderRadius: 7,
              display: "flex",
              cursor: "pointer",
              fontWeight: "bold",
              background: "#00ADB5",
              justifyContent: "center",
            }}
            onClick={() => handleCreateUser()}
          >
            Proceed
          </div>
        </div>
      </div>
    </div>
  );
};
