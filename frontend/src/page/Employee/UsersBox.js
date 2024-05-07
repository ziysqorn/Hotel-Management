import React from "react";
import { useState } from "react";
import "./Design.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UsersList, UsersLists } from "./UsersLists";

export const UsersBox = () => {
  return (
    <div
      className="Users-box"
      style={{
        width: "35%",
        background: "#2E2E2E",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "1vw",
          fontWeight: "bold",
          margin: "1%",
        }}
      >
        Users
      </div>
      <div
        className="Search-bar"
        style={{
          height: "14%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          className="Search"
          style={{
            borderRadius: 5,
            background: "black",
            width: "60%",
            paddingLeft: "3px",
            height: "60%",
            display: "flex",
            alignItems: "center",
            marginRight: "5px",
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: "white",
              fontSize: "0.9vw",
              paddingLeft: "5px",
              width: "10%",
            }}
          />
          <input
            type="text"
            style={{
              background: "black",
              border: "black solid 2px",
              textDecoration: "none",
              outline: "none",
              color: "white",
              fontSize: "0.8vw",
              width: "85%",
              borderRadius: 5,
            }}
            placeholder="Search ..."
          />
        </div>

        <div
          className="BtnAddUser"
          style={{
            background: "#00FFF5",
            borderRadius: 10,
            padding: "3%",
            fontSize: "0.8vw",
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => console.log("added")}
        >
          + Add
        </div>
      </div>

      <UsersLists />
    </div>
  );
};
