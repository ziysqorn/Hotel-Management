import React from "react";
import { useEffect, useState } from "react";
import "./Design.css";

export const Total_Info = () => {
  const [isWindowOpen, setIswindowOpen] = useState(false);
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
          <div style={{ fontSize: "20px", margin: "2%" }}>3000</div>
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
          <div style={{ fontSize: "20px", margin: "2%" }}>2000</div>
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
          onClick={() => {
            // Xử lý khi click
            console.log("added");
            setIswindowOpen(true);
          }}
        >
          + Add Employees
        </div>
        {isWindowOpen && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "40vw",
              height: "40vw",
              background: "white",
            }}
          ></div>
        )}

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
          onClick={() => {
            // Xử lý khi click
            console.log("removed");
          }}
        >
          {" "}
          Remove Employees
        </div>
      </div>
    </div>
  );
};
// export const ChildComponent = ({ onExit, ...Props }) => {
//   // Props.dat
//   useEffect(() => {
//     console.log(Props);
//   }, []);
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         width: "40vw",
//         height: "40vw",
//         background: "white",
//       }}
//       onClick={() => {
//         onExit("fk thie s");
//       }}
//     ></div>
//   );
// };
