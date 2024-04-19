import React, { useEffect, useState } from "react";
import { Floor } from "./Floor.js";
import "./style.css";
import axios from "axios";
export const RoomsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/room/query", {
        params: {
          RoomName: "P1",
        },
      })
      .then((item) => {
        console.log(item.data);
        setData(item.data.recordset);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className={`fade-in ${isVisible ? "visible" : ""}`}
      style={{ display: "flex", width: "100%", flexDirection: "column" }}
    >
      <div
        style={{ width: "100%", minHeight: "100px", border: "1px solid white" }}
      >

      </div>
      <div
        className={`fade-in ${isVisible ? "visible" : ""}`}
        style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
      >
        {data && (
          <div style={{ flex: "0 0 calc(45% - 40px)", margin: "10px" }}>
            <Floor data={data} floorIndex={"P1"} />
          </div>
        )}
        {data && (
          <div style={{ flex: "0 0 calc(45% - 40px)", margin: "10px" }}>
            <Floor data={data} floorIndex={"P2"} />
          </div>
        )}
        {data && (
          <div style={{ flex: "0 0 calc(45% - 40px)", margin: "10px" }}>
            <Floor data={data} floorIndex={"P3"} />
          </div>
        )}
        {data && (
          <div style={{ flex: "0 0 calc(45% - 40px)", margin: "10px" }}>
            <Floor data={data} floorIndex={"P4"} />
          </div>
        )}
      </div>
    </div>
  );
};
