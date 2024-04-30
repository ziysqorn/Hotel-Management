import React, { useEffect, useState } from "react";
import { Floor } from "./Floor.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";
import axios from "axios";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Searchbar } from "../../component/Searchbar/Searchbar.js";
export const RoomsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({
    RoomTypeId: null,
    RoomId: null,
    RoomName: null,
    Status: null,
    ExpectedCheckOutDate: null,
    CheckInDate: null,
  });

  const getData = () => {
    console.log(query);
    if (query.CheckInDate && query.ExpectedCheckOutDate) {
      axios
        .get("http://localhost:4000/api/room/getRoomWithDate", {
          params: query,
        })
        .then((item) => {
          console.log(item.data);
          setData(item.data.recordset);
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      axios
        .get("http://localhost:4000/api/room/query", {
          params: query,
        })
        .then((item) => {
          console.log(item.data);
          setData(item.data.recordset);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    console.log(window.location.pathname);
    console.log(query);
    getData();
  }, []);
  // useEffect(() => {
  //   getData();
  // }, [query]);
  return (
    <div
      className={`fade-in ${isVisible ? "visible" : ""}`}
      style={{ display: "flex", width: "100%", flexDirection: "column" }}
    >
      <div
        style={{ width: "100%", minHeight: "15vh", border: "1px solid white" }}
      >
        {/* input div */}
        <Searchbar
          submitSearch={() => {
            getData();
            console.log(query);
          }}
          changeRoomType={(id) => {
            setQuery({ ...query, RoomTypeId: id });
          }}
          changeRoomName={(name) => {
            setQuery({ ...query, RoomName: name });
          }}
          changeRoomDate={(item) => {
            console.log(item);
            if (item) {
              setQuery({
                ...query,
                CheckInDate: `${item.startDate.year}-${item.startDate.month}-${item.startDate.date}`,
                ExpectedCheckOutDate: `${item.endDate.year}-${item.endDate.month}-${item.endDate.date}`,
              });
            } else {
              setQuery({
                ...query,
                CheckInDate: null,
                ExpectedCheckOutDate: null,
              });
            }
          }}
        />
      </div>
      <div
        className={`fade-in ${isVisible ? "visible" : ""}`}
        style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
      >
        {data && (
          // 639x410 / 1700 x 1100
          <div
            style={{
              flex: "0 0 calc(45% - 40px)",
              minHeight: "40vh",
              margin: "20px",
            }}
          >
            <Floor data={data} floorIndex={"P1"} />
          </div>
        )}
        {data && (
          // 639x410 / 1700 x 1100
          <div
            style={{
              flex: "0 0 calc(45% - 40px)",
              minHeight: "40vh",
              margin: "20px",
            }}
          >
            <Floor data={data} floorIndex={"P2"} />
          </div>
        )}
        {data && (
          // 639x410 / 1700 x 1100
          <div
            style={{
              flex: "0 0 calc(45% - 40px)",
              minHeight: "40vh",
              margin: "20px",
            }}
          >
            <Floor data={data} floorIndex={"P3"} />
          </div>
        )}
        {data && (
          // 639x410 / 1700 x 1100
          <div
            style={{
              flex: "0 0 calc(45% - 40px)",
              minHeight: "40vh",
              margin: "20px",
            }}
            onClick={function () {
              console.log("fk this sheet");
            }}
          >
            <Floor data={data} floorIndex={"P4"} />
          </div>
        )}
      </div>
    </div>
  );
};
