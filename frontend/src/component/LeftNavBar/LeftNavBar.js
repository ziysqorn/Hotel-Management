import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faCubes,
  faGraduationCap,
  faTv,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faFaceAngry } from "@fortawesome/free-regular-svg-icons";

export const LeftNavBar = () => {
  const [selectedList, setSeletectList] = useState([true, false, false, false,false]);

  const changeRoute = (index) => {
    console.log(index, selectedList);
    setSeletectList((preList) => {
      return preList.map((item, item_index) => {
        return index == item_index ? true : false;
      });

      //   return preList;
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#202020",
        width: "300px",
        height: "80vh",
        marginTop: "15px",
        marginLeft: "15px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        style={{ textDecoration: "none" }}
        to={"/analytics"}
        onClick={() => {
          changeRoute(0);
        }}
      >
        <div
          style={{
            display: "flex",
            height: "72px",
            backgroundColor: selectedList[0] ? "#2E2E2E" : "transparent",
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faChartSimple}
            style={{
              fontSize: "20px",
              color: "#B0B0B0",
              marginLeft: "20px",
              marginRight: "15px",
            }}
          />
          <p style={{ fontSize: "20px", color: "#B0B0B0", fontWeight: 600 }}>
            Analytics
          </p>
        </div>
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        to={"/rooms"}
        onClick={() => {
          changeRoute(1);
        }}
      >
        <div
          style={{
            display: "flex",
            height: "72px",
            backgroundColor: ` ${selectedList[1] ? "#2E2E2E" : "transparent"}`,
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faTv}
            style={{
              fontSize: "20px",
              color: "#B0B0B0",
              marginLeft: "20px",
              marginRight: "15px",
            }}
          />
          <p style={{ fontSize: "20px", color: "#B0B0B0", fontWeight: 600 }}>
            Rooms
          </p>
        </div>
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        to={"/customers"}
        onClick={() => {
          changeRoute(2);
        }}
      >
        <div
          style={{
            display: "flex",
            height: "72px",
            backgroundColor: ` ${selectedList[2] ? "#2E2E2E" : "transparent"}`,
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faUserGraduate}
            style={{
              fontSize: "20px",
              color: "#B0B0B0",
              marginLeft: "20px",
              marginRight: "15px",
            }}
          />
          <p style={{ fontSize: "20px", color: "#B0B0B0", fontWeight: 600 }}>
            Customers
          </p>
        </div>
      </Link>

      <Link
        style={{ textDecoration: "none" }}
        to={"/services"}
        onClick={() => {
          changeRoute(3);
        }}
      >
        <div
          style={{
            display: "flex",
            height: "72px",
            backgroundColor: ` ${selectedList[3] ? "#2E2E2E" : "transparent"}`,
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faCubes}
            style={{
              fontSize: "20px",
              color: "#B0B0B0",
              marginLeft: "20px",
              marginRight: "15px",
            }}
          />
          <p style={{ fontSize: "20px", color: "#B0B0B0", fontWeight: 600 }}>
            Analytics
          </p>
        </div>
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        to={"/employees"}
        onClick={() => {
          changeRoute(4);
        }}
      >
        <div
          style={{
            display: "flex",
            height: "72px",
            backgroundColor: ` ${selectedList[4] ? "#2E2E2E" : "transparent"}`,
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faFaceAngry}
            style={{
              fontSize: "20px",
              color: "#B0B0B0",
              marginLeft: "20px",
              marginRight: "15px",
            }}
          />
          <p style={{ fontSize: "20px", color: "#B0B0B0", fontWeight: 600 }}>
            Employees
          </p>
        </div>
      </Link>
    </div>
  );
};
