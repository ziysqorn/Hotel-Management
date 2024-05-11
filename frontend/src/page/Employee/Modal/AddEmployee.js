import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  faX,
  faChevronLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddEmployeeModal = ({ AddEmployeeIsOpen, AddEmployeeOnClose }) => {
  const [employeeInfo, setEmployeeInfo] = useState({
    FullName: "",
    PersonalId: "",
    Phone: "",
    BirthDay: null,
    FristDay: null,
    Address: "",
    Position: "",
    RolesId: "",
  });

  useEffect(() => {
    // Reset employeeInfo when modal is closed
    if (!AddEmployeeIsOpen) {
      setEmployeeInfo({
        FullName: "",
        PersonalId: "",
        Phone: "",
        BirthDay: null,
        FristDay: null,
        Address: "",
        Position: "",
        RolesId: "",
      });
    }
  }, [AddEmployeeIsOpen]);

  const isInfoValid = () => {
    const {
      FullName,
      PersonalId,
      Phone,
      BirthDay,
      FristDay,
      Address,
      Position,
      RolesId,
    } = employeeInfo;
    // Kiểm tra xem tất cả các trường đã được điền đầy đủ chưa
    return (
      FullName &&
      PersonalId &&
      Phone &&
      BirthDay &&
      FristDay &&
      Address &&
      Position &&
      RolesId
    );
  };
  const handleProceed = async () => {
    // Kiểm tra các trường thông tin
    if (!isInfoValid()) {
      alert("Please fill in all required information.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/employee/Add",
        {
          item: employeeInfo,
        }
      );

      console.log("Response from API:", response.data);

      AddEmployeeOnClose(false);
      alert("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleBirthdayChange = (date) => {
    setEmployeeInfo((prevInfo) => ({
      ...prevInfo,
      BirthDay: date,
    }));
  };

  const handleFirstDayChange = (date) => {
    setEmployeeInfo((prevInfo) => ({
      ...prevInfo,
      FristDay: date,
    }));
  };

  return (
    AddEmployeeIsOpen && (
      <div
        className="animate__animated animate__zoomIn"
        style={{
          position: "absolute",
          top: "5%",
          left: "40%",
          width: "27vw",
          height: "40vw",
          borderRadius: 10,
          background: "#2E2E2E",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            marginLeft: "3%",
            flexDirection: "column",
            justifyContent: "center",
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
            <div
              style={{ display: "flex", width: "65%", alignItems: "center" }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ marginRight: "5%" }}
              />
              <div style={{ fontSize: "150%" }}>Add Employee</div>
            </div>
            <FontAwesomeIcon
              icon={faX}
              className="faX"
              style={{ fontSize: "90%", cursor: "pointer" }}
              onClick={() => AddEmployeeOnClose(false)}
            />
          </div>

          <input
            type="text"
            value={employeeInfo.FullName}
            onChange={handleChange}
            name="FullName"
            style={{
              width: "90%",
              height: "7%",
              color: "darkgray",
              marginTop: "3%",
              marginBottom: "3%",
              background: "#111111",
              border: "solid #111111 1px",
              borderRadius: 5,
            }}
            placeholder="   Employee Name"
          />
          <div
            style={{
              display: "flex",
              width: "91%",
              height: "7%",
              marginBottom: "3%",
              borderRadius: 5,
              alignItems: "center",
              background: "#111111",
              border: "solid #111111 1px",
            }}
          >
            <DatePicker
              selected={employeeInfo.BirthDay}
              onChange={handleBirthdayChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="   Birthday                                           //"
              className="datepicker-input"
            />
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ color: "darkgray", width: "10%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "3%",
              alignItems: "center",
              width: "91.5%",
              height: "7%",
            }}
          >
            <input
              type="text"
              style={{
                width: "80%",
                color: "darkgray",
                background: "#111111",
                marginRight: "3%",
                height: "100%",
                border: "none",
                borderRadius: 5,
              }}
              value={employeeInfo.PersonalId}
              onChange={handleChange}
              name="PersonalId"
              placeholder="   Personal ID"
            />
            <input
              type="text"
              style={{
                width: "20%",
                color: "darkgray",
                background: "#111111",
                height: "100%",
                border: "none",
                borderRadius: 5,
              }}
              placeholder="   Image"
            />
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: "7%",
              color: "darkgray",
              marginBottom: "3%",
              background: "#111111",
              border: "solid #111111 1px",
              borderRadius: 5,
            }}
            value={employeeInfo.Phone}
            onChange={handleChange}
            name="Phone"
            placeholder="   Phone"
          />
          <input
            type="text"
            style={{
              width: "90%",
              height: "7%",
              color: "darkgray",
              marginBottom: "3%",
              background: "#111111",
              border: "solid #111111 1px",
              borderRadius: 5,
            }}
            value={employeeInfo.Address}
            onChange={handleChange}
            name="Address"
            placeholder="   Address"
          />
          <div
            style={{
              display: "flex",
              width: "91%",
              height: "7%",
              marginBottom: "3%",
              borderRadius: 5,
              alignItems: "center",
              background: "#111111",
              border: "solid #111111 1px",
            }}
          >
            <DatePicker
              selected={employeeInfo.FristDay}
              onChange={handleFirstDayChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="   Firstday                                            //"
              className="datepicker-input"
            />
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ color: "darkgray", width: "10%" }}
            />
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: "7%",
              color: "darkgray",
              marginBottom: "5%",
              background: "#111111",
              border: "solid #111111 1px",
              borderRadius: 5,
            }}
            value={employeeInfo.RolesId}
            onChange={handleChange}
            name="RolesId"
            placeholder="   Roles"
          />
          <input
            type="text"
            style={{
              width: "90%",
              height: "7%",
              color: "darkgray",
              marginBottom: "3%",
              background: "#111111",
              border: "solid #111111 1px",
              borderRadius: 5,
            }}
            value={employeeInfo.Position}
            onChange={handleChange}
            name="Position"
            placeholder="   Position"
          />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div
              style={{
                color: "white",
                width: "40%",
                padding: "2%",
                borderRadius: 7,
                display: "flex",
                fontSize: "120%",
                cursor: "pointer",
                marginRight: "7%",
                fontWeight: "bold",
                background: "#00ADB5",
                justifyContent: "center",
              }}
              onClick={handleProceed}
            >
              Proceed
            </div>
          </div>
        </div>
      </div>
    )
  );
};
