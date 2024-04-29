import React from "react";
import { myAppColor } from "../../colors";
import "./style.css";
import axios from "axios";
import ServiceList from "../../component/ServiceList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Service_Info } from "./ServiceInfo";

export const ServicesPage = ({ onSearch, ...props }) => {
  const removePword = (item) => {
    return item.slice(1);
  };
  const servicesData = [
    { code: "001", name: "Service 1", price: "$10" },
    { code: "002", name: "Service 2", price: "$20" },
    { code: "003", name: "Service 3", price: "$30" },
    // Add more service data as needed
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <div
        className="topbar"
        style={{
          width: "95%",
          display: "flex",
          margin: "2%",
          alignItems: "center",
          background: "black",
          padding: "1%",
          borderRadius: 10,
        }}
      >
        <div style={{ alignItems: "center" }}>
          {/* <span className="material-symbols-light--search" style={{ color: "white", marginRight: "5px" }}></span> */}
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "12vw",
              height: "30px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div
          style={{ flex: 2, textAlign: "center", fontSize: 25, color: "white" }}
        >
          SERVICES
        </div>
        <div
          className="AddService"
          style={{
            color: "#00FFF5",
            fontSize: 20,
            border: "#00FFF5 solid 1px",
            borderRadius: 10,
            alignItems: "center",
            padding: "1%",
            cursor:"pointer",
          }}
          onClick={()=>{console.log("sucscess");}}
        >
          +Add Service
        </div>
      </div>

      <Service_Info />
    </div>
  );
};
