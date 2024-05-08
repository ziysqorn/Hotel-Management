import React from "react";
import "./Design.css";
import { useState, useEffect } from "react";
import { DeleteConfirm } from "./Modal/DeleteConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faUserCircle,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

export const UsersLists = () => {
  let items = ["john", "sanra", "Tomuya", "Linda", "Phap", "Davinci"];
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => clearInterval(interval);
  }, []);
  const [deleteWindow, setdeleteWindow] = useState(false);

  return (
    <div
      className="users-list"
      style={{ justifyContent: "center", height: "45vh", marginTop: "10px" }}
    >
      <ul style={{ listStyleType: "none", width: "24vw", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              background: "black",
              color: "white",
              alignItems: "center",
              borderRadius: 5,
              height: "7vh",
              width: "100%",
              margin: "5px",
            }}
          >
            <div
              className="user-info"
              style={{ width: "80%", display: "flex", alignItems: "center" }}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ marginLeft: "7%", fontSize: "1vw" }}
              />
              <div style={{ flexDirection: "column", marginLeft: "7%", fontSize:"1vw"}}>
                <span>{item}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{
                      fontSize: "0.7vw",
                      color: "#00FFF5",
                      paddingRight: "10%",
                    }}
                  />
                  <div className="time-log" style={{ fontSize: "0.6vw" }}>
                    {currentTime}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="user-actions"
              style={{ display: "flex", width: "10%",fontSize:"1vw" }}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="faPenToSquare"
                style={{ paddingRight: "40%", cursor: "pointer" }}
              />
              <FontAwesomeIcon
                mode="delete-user"
                icon={faTrashCan}
                className="faTrashCan"
                style={{ cursor: "pointer" }}
                onClick={() => setdeleteWindow(true)}
              />
            </div>
          </li>
        ))}
      </ul>
      <DeleteConfirm
        isDelWindowOpen={deleteWindow}
        onDelWindowClose={() => setdeleteWindow(false)}
      />
    </div>
  );
};
