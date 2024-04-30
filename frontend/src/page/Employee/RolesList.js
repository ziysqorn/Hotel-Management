import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const Roles_List = () => {
  let roleItems = ["Staff", "Manager", "CEO"];
  return (
    <div className="role-list" style={{ height: "40vh" }}>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {roleItems.map((item, index) => (
          <li
            style={{
              display: "flex",
              background: "black",
              color: "white",
              alignItems: "center",
              borderRadius: 5,
              height: "7vh",
              width: "17vw",
              margin: "5px",
            }}
          >
            <div style={{ width: "70%", marginLeft: "5%" }}>{item}</div>
            <div className="user-actions" style={{ display: "flex" }}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="faPenToSquare"
                style={{ paddingRight: "50%", cursor: "pointer" }}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="faTrashCan"
                style={{ cursor: "pointer" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
