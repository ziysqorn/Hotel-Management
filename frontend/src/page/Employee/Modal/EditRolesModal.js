import React from "react";
import { faX, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditRolesModal = ({ isEditOpen, onEditClose }) => {
  if (!isEditOpen) return null;
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
            <div style={{ fontSize: "150%" }}>Edit Roles</div>
          </div>
          <FontAwesomeIcon
            icon={faX}
            className="faX"
            style={{ fontSize: "90%" }}
            onClick={() => onEditClose(false)}
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
              Name of Roles
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
            onClick={() => onEditClose(false)}
          >
            Proceed
          </div>
        </div>
      </div>
    </div>
  );
};
