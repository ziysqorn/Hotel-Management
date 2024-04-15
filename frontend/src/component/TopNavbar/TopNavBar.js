import React from "react";
import appLogo from "../../app-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { myAppColor } from "../../colors.js";
// import Fonta
export const TopNavBar = () => {
  return (
    <div
      style={{
        height: "130px",
        width: "100%",
        backgroundColor: myAppColor.Black.TopNavBackground,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            width: "114px",
            height: "97px",
            borderRadius: "50%",
            margin: "auto",
            marginLeft: "20px",

            // justifyContent:""
          }}
        >
          <img style={{ width: "114px", height: "97px" }} src={appLogo} />
        </div>
        <p
          style={{
            color: "#FFFFFF",
            marginLeft: "13px",
            font: "Montserrat",
            fontWeight: 600,
            fontSize: "24px",
          }}
        >
          Del Luna
        </p>
      </div>
      <div className="Right" style={{ display: "flex", marginRight: "30px" }}>
        <div
          style={{
            width: "62px",
            height: "62px",
            backgroundColor: myAppColor.Black.IconBackground,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            margin: "10px",
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "30px", color: "#FFFFFF" }}
            icon={faCalendar}
          />
        </div>
        <div
          style={{
            width: "62px",
            height: "62px",
            backgroundColor: myAppColor.Black.IconBackground,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            margin: "10px",
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "30px", color: "#FFE605" }}
            icon={faBell}
          />
        </div>
        <div
          style={{
            width: "62px",
            height: "62px",
            backgroundColor: myAppColor.Black.IconBackground,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            margin: "10px",
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "30px", color: "#00FFF5" }}
            icon={faUser}
          />
        </div>
      </div>
    </div>
  );
};
