import React from "react";
export const Delete_Confirm = ({ isDelWindowOpen, onDelWindowClose }) => {
  if (!isDelWindowOpen) return null;
  return (
    <div
      className="animate__animated animate__zoomIn"
      style={{
        position: "absolute",
        top: "15%",
        left: "35%",
        width: "35vw",
        height: "15vw",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        background: "#2E2E2E",
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "150%",
            display: "flex",
            padding: '5%',
            justifyContent: "center",
          }}
        >
          Cancel Process?
        </div>
        <div
          style={{
            fontSize: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Are you sure to delete?
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: 10,
            width: "38%",
            fontWeight: "bold",
            justifyContent: "center",
            color: "white",
            background: "#3E3E3E",
            padding: "3%",
            cursor: 'pointer',
          }}
          onClick={() => onDelWindowClose(false)}
        >
          Yes
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: 10,
            width: "38%",
            justifyContent: "center",
            fontWeight: "bold",
            background: "#B0B0B0",
            padding: "3%",
            cursor: 'pointer',
          }}
          onClick={() => onDelWindowClose(false)}
        >
          No
        </div>
      </div>
    </div>
  );
};
