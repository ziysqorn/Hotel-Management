import React from "react";
import "./Design.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faUserCircle,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
const url = null;
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
  return (
    <div
      className="users-list"
      style={{ justifyContent: "center", height: "40vh" }}
    >
      <ul style={{ listStyleType: "none", width: "23vw", padding: 0 }}>
        {items.map((item, index) => (
          <li
            style={{
              display: "flex",
              background: "black",
              color: "white",
              alignItems: "center",
              borderRadius: 5,
              height: "7vh",
              width: "24vw",
              margin: "5px",
            }}
          >
            <div
              className="user-info"
              style={{ width: "83%", display: "flex", alignItems: "center" }}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ marginLeft: "7%", fontSize: "1vw" }}
              />
              <div
                style={{
                  flexDirection: "column",
                  marginLeft: "7%",
                  fontSize: "1vw",
                }}
              >
                <span>{item}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{
                      fontSize: "0.8vw",
                      color: "#00FFF5",
                      cursor:"pointer",
                      paddingRight: "10%",
                    }}
                  />
                  <div className="time-log" style={{ fontSize: "0.8vw" }}>
                    {currentTime}
                  </div>
                </div>
              </div>
            </div>
            <div className="user-actions" style={{ display: "flex" }}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="faPenToSquare"
                style={{
                  paddingRight: "50%",
                  fontSize: "1vw",
                  cursor: "pointer",
                }}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="faTrashCan"
                style={{ cursor: "pointer", fontSize: "1vw" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
