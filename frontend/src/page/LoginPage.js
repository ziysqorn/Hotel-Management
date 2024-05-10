import React, { useEffect, useState } from "react";
import { myAppColor } from "../colors";
import { login } from "../component/apicalls";

export const LoginPage = ({ ...props }) => {
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {}, []);
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#111111",
        // background:"white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "30%",
          minHeight: "40vh",
          //   border: "1px solid white",
          borderRadius: "1.5vw",
          background: "#3F3F3F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          color: "white",
        }}
      >
        <p style={{ fontSize: "1vw", fontWeight: 600, marginBottom: "2vw" }}>
          Login
        </p>
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            // background:"white"
          }}
        >
          <div
            style={{
              margin: "0 auto ",
              background: "#141414",
              width: "80%",
              padding: "0.8vw 0.2vw",
              borderRadius: "0.5vw",
            }}
          >
            <input
              value={userForm.username}
              placeholder="username"
              style={{
                fontSize: "0.8vw",
                backgroundColor: "#141414",
                outline: "none",
                textDecoration: "none",
                border: "none",
                color: "white",
              }}
              onChange={(e) => {
                setUserForm((prev) => {
                  return { ...prev, username: e.target.value };
                });
              }}
            />
          </div>
          <div
            style={{
              margin: "0 auto ",
              background: "#141414",
              width: "80%",
              padding: "0.8vw 0.2vw",
              borderRadius: "0.5vw",
            }}
          >
            <input
              value={userForm.password}
              type="password"
              placeholder="password"
              style={{
                fontSize: "0.8vw",
                backgroundColor: "#141414",
                outline: "none",
                textDecoration: "none",
                border: "none",
                color: "white",
              }}
              onChange={(e) => {
                setUserForm((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            flex: 0.5,
            height: "1vw",
          }}
        >
          <div
            style={{
              width: "25%",
              background: "#00868D",
              margin: "1vw auto",
              padding: "0.5vw",
              cursor: "pointer",
              borderRadius: "1vw",
            }}
            onClick={() => {
              props.handleLogin(userForm);
            }}
          >
            <p
              style={{ fontSize: "1vw", textAlign: "center", fontWeight: 500 }}
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
