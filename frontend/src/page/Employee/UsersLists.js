import React from "react";
import axios from "axios";
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

export const UsersLists = ({ users }) => {
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
  const [deleteMode, setDeleteMode] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div
      className="users-list"
      style={{ justifyContent: "center", height: "45vh", marginTop: "10px" }}
    >
      {users.length > 0 ? (
        <ul style={{ listStyleType: "none", width: "95%", padding: 0 }}>
          {users.map((user, index) => (
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
                style={{
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Avatar"
                    style={{
                      marginLeft: "7%",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ marginLeft: "7%", fontSize: "1.8vw" }}
                  />
                )}
                <div
                  style={{
                    flexDirection: "column",
                    marginLeft: "7%",
                    alignItems: "flex-start",
                  }}
                >
                  <span>{user.FullName}</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faArrowRightToBracket}
                      style={{
                        fontSize: "10px",
                        color: "#00FFF5",
                        paddingRight: "10%",
                      }}
                    />
                    <div className="time-log" style={{ fontSize: "10px" }}>
                      {currentTime}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="user-actions"
                style={{ display: "flex", width: "10%", fontSize: "1.2vw" }}
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
                  onClick={() => {
                    setdeleteWindow(true);
                    setDeleteMode("user");
                    setSelectedId(user.UserId);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      <DeleteConfirm
        isDelWindowOpen={deleteWindow}
        onDelWindowClose={() => setdeleteWindow(false)}
        deleteMode={() => deleteMode()}
        selectedId={selectedId}
      />
    </div>
  );
};
