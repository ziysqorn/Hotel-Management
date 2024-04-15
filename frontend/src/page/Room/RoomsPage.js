import React, { useState } from "react";
import { Floor } from "./Floor.js";
import "./style.css";
import axios from "axios";
export const RoomsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  useState(() => {
    axios
      .get("http://localhost:4000/api/room")
      .then((item) => {
        console.log(item.data);
        setData(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className={`fade-in ${isVisible ? "visible" : ""}`}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {data && <Floor data={data} floorIndex={'P1'} />}
    </div>
  );
};
