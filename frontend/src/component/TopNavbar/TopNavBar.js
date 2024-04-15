import React, { useState } from "react";
import appLogo from "../../app-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBell, faL, faUser } from "@fortawesome/free-solid-svg-icons";
import { myAppColor } from "../../colors.js";
// import Fonta
export const TopNavBar = () => {
  const [isHover, setIsHover] = useState([false, false, false]);

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
      {/* Start of top nav  */}
      <div className="Right" style={{ display: "flex", marginRight: "30px" }}>
        <div
          onMouseEnter={() => {
            setIsHover([true, false, false]);
          }}
          onMouseLeave={() => {
            setIsHover([false, false, false]);
          }}
          style={{
            width: "62px",
            height: "62px",
            backgroundColor: myAppColor.Black.IconBackground,
            display: "flex",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            margin: "10px",
            // hover stuff
            transform: `translateY(${isHover[0] ? "-5px" : "0"})`,
            opacity: isHover[0] ? 1 : 0.8,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "30px", color: "#FFFFFF" }}
            icon={faCalendar}
          />
        </div>
        <div
          onMouseEnter={() => {
            setIsHover([false, true, false]);
          }}
          onMouseLeave={() => {
            setIsHover([false, false, false]);
          }}
          style={{
            width: "62px",
            height: "62px",
            backgroundColor: myAppColor.Black.IconBackground,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            alignItems: "center",
            borderRadius: "50%",
            margin: "10px",
            // hover stuf
            transform: `translateY(${isHover[1] ? "-5px" : "0"})`,
            opacity: isHover[1] ? 1 : 0.8,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "30px", color: "#FFE605" }}
            icon={faBell}
          />
        </div>
        <div
          onMouseEnter={() => {
            setIsHover([false, false, true]);
          }}
          onMouseLeave={() => {
            setIsHover([false, false, false]);
          }}
          style={{
            width: "62px",
            height: "62px",
            backgroundColor: myAppColor.Black.IconBackground,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            alignItems: "center",
            borderRadius: "50%",
            margin: "10px",
            // hover stuf
            transform: `translateY(${isHover[2] ? "-5px" : "0"})`,
            opacity: isHover[2] ? 1 : 0.8,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "30px", color: "#00FFF5" }}
            icon={faUser}
          />
        </div>
      </div>
      {/* end of top nav  */}
    </div>
  );
};
