import "animate.css";
import "./ModalStyle.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import React from "react";
import {
  faX,
  faChevronLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditEmployModal = ({ EditEmployIsOpen, EditEmployOnClose }) => {
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [selectedFirstDay, setSelectedFirstDay] = useState(null);
  if (!EditEmployIsOpen) return null;

  return (
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
            style={{ fontSize: "90%" }}
            onClick={() => EditEmployOnClose(false)}
          />
        </div>

        <input
          type="text"
          style={{
            width: "90%",
            height: "7%",
            color: "white",
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
            selected={selectedBirthday}
            onChange={(date) => setSelectedBirthday(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="   Birthday                                           //"
            className="datepicker-input"
          />
          <FontAwesomeIcon
            icon={faCalendar}
            style={{ color: "white", width: "10%" }}
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
              color: "white",
              background: "#111111",
              marginRight: "3%",
              height: "100%",
              border: "none",
              borderRadius: 5,
            }}
            placeholder="   Personal ID"
          />
          <input
            type="text"
            style={{
              width: "20%",
              color: "white",
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
            color: "white",
            marginBottom: "3%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: 5,
          }}
          placeholder="   Phone"
        />
        <input
          type="text"
          style={{
            width: "90%",
            height: "7%",
            color: "white",
            marginBottom: "3%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: 5,
          }}
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
            selected={selectedFirstDay}
            onChange={(date) => setSelectedFirstDay(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="   Firstday                                            //"
            className="datepicker-input"
          />
          <FontAwesomeIcon
            icon={faCalendar}
            style={{ color: "white", width: "10%" }}
          />
        </div>
        <input
          type="text"
          style={{
            width: "90%",
            height: "7%",
            color: "white",
            marginBottom: "5%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: 5,
          }}
          placeholder="   Roles"
        />
        <input
          type="text"
          style={{
            width: "90%",
            height: "7%",
            color: "white",
            marginBottom: "3%",
            background: "#111111",
            border: "solid #111111 1px",
            borderRadius: 5,
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
              borderRadius: 7,
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
