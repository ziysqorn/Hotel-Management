import "animate.css";
import "./ModalStyle.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import React from "react";
import {
  faX,
  faChevronLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditEmployModal = ({
  EditEmployIsOpen,
  EditEmployOnClose,
  employeeInfo,
}) => {
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [selectedFirstDay, setSelectedFirstDay] = useState(null);
  const [fullName, setFullName] = useState("null");
  const [personalId, setPersonalId] = useState("null");
  const [phone, setPhone] = useState("null");
  const [address, setAddress] = useState("null");
  const [position, setPosition] = useState("null");
  const [rolesId, setRolesId] = useState("null");
  const [image, setImage] = useState("null");

  useEffect(() => {
    if (employeeInfo) {
      setSelectedBirthday(new Date(employeeInfo.BirthDay));
      setSelectedFirstDay(new Date(employeeInfo.FirstDay));
      setFullName(employeeInfo.FullName || "null");
      setPersonalId(employeeInfo.PersonalId || "null");
      setPhone(employeeInfo.Phone || "null");
      setAddress(employeeInfo.Address || "null");
      setPosition(employeeInfo.position || "null");
      setRolesId(employeeInfo.RolesId || "null");
      setImage(employeeInfo.image || "null");
    }
  }, [employeeInfo]);

  if (!EditEmployIsOpen) return null;

  console.log("selectedBirthday:", selectedBirthday);
  console.log("selectedFirstDay:", selectedFirstDay);
  return (
    <div
      className="animate__animated animate__zoomIn"
      style={{
        position: "absolute",
        top: "5%",
        left: "40%",
        width: "27vw",
        height: "40vw",
        borderRadius: "5%",
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
          <div style={{ display: "flex", width: "65%", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ marginRight: "5%" }}
            />
            <div style={{ fontSize: "150%" }}>Edit Employee</div>
          </div>
          <FontAwesomeIcon
            icon={faX}
            className="faX"
            style={{ fontSize: "90%", cursor: "pointer" }}
            onClick={() => EditEmployOnClose(false)}
          />
        </div>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
            borderRadius: "2%",
            alignItems: "center",
            background: "#111111",
            border: "solid #111111 1px",
          }}
        >
          <DatePicker
            selected={selectedBirthday || new Date()}
            onChange={(date) => setSelectedBirthday(date)}
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
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            style={{
              width: "80%",
              color: "darkgray",
              background: "#111111",
              marginRight: "3%",
              height: "100%",
              border: "none",
              borderRadius: "2%",
            }}
            placeholder="   Personal ID"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{
              width: "20%",
              color: "darkgray",
              background: "#111111",
              height: "100%",
              border: "none",
              borderRadius: "2%",
            }}
            placeholder="   Image"
          />
        </div>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "90%",
            height: "7%",
            color: "darkgray",
            marginBottom: "3%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: "2%",
          }}
          placeholder="   Phone"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "90%",
            height: "7%",
            color: "darkgray",
            marginBottom: "3%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: "2%",
          }}
          placeholder="   Address"
        />
        <div
          style={{
            display: "flex",
            width: "91%",
            height: "7%",
            marginBottom: "3%",
            borderRadius: "2%",
            alignItems: "center",
            background: "#111111",
            border: "solid #111111 1px",
          }}
        >
          <DatePicker
            selected={selectedFirstDay || new Date()}
            onChange={(date) => setSelectedFirstDay(date)}
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
          value={rolesId}
          onChange={(e) => setRolesId(e.target.value)}
          style={{
            width: "90%",
            height: "7%",
            color: "darkgray",
            marginBottom: "5%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: "2%",
          }}
          placeholder="   Roles"
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{
            width: "90%",
            height: "7%",
            color: "darkgray",
            marginBottom: "3%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: "2%",
          }}
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
              borderRadius: "7%",
              display: "flex",
              fontSize: "120%",
              cursor: "pointer",
              marginRight: "7%",
              fontWeight: "bold",
              background: "#00ADB5",
              justifyContent: "center",
            }}
            onClick={() => EditEmployOnClose(false)}
          >
            Proceed
          </div>
        </div>
      </div>
    </div>
  );
};
