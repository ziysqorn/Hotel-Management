import React, { useContext, useState } from "react";
import appLogo from "../../app-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBell, faL, faUser } from "@fortawesome/free-solid-svg-icons";
import { myAppColor } from "../../colors.js";
import { MainContext } from "../../App.js";
import "./style.css";
import { Navigate, useNavigate } from "react-router-dom";
// import Fonta
export const TopNavBar = ({ ...props }) => {
  const [isHover, setIsHover] = useState([false, false, false]);
  const { context, setContext } = useContext(MainContext);
  const navigate = useNavigate();

  const [isPersonalWindowOpen, setIsPersonalWindowOpen] = useState(false);
  // useParams(()=>{
  //   console.log("sthgn change");
  // })
  return (
    <div
      style={{
        height: "8vh",
        width: "100vw",
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
            width: "7vh",
            height: "7vh",
            borderRadius: "50%",
            margin: "auto",
            marginLeft: "20px",

            // justifyContent:""
          }}
        >
          <img style={{ width: "100%", height: "100%" }} src={appLogo} />
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
      <div
        className="Right"
        style={{
          display: "flex",
          marginRight: "30px",
          height: "100%",
          alignItems: "center",
        }}
      >
        <div
          onMouseEnter={() => {
            setIsHover([true, false, false]);
          }}
          onMouseLeave={() => {
            setIsHover([false, false, false]);
          }}
          style={{
            width: "62px",
            height: "50%",
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
          onClick={() => {
            navigate("/rooms/orderroom");
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
            height: "50%",
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
          onClick={() => {
            console.log("handle open detail");
            setIsPersonalWindowOpen(!isPersonalWindowOpen)
          }}
          style={{
            width: "62px",
            height: "50%",
            position: "relative",
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
        {isPersonalWindowOpen ? <PersonalWindow handleLogout={()=>props.handleLogout()} /> : null}
      </div>
      {/* end of top nav  */}
    </div>
  );
};

const PersonalWindow = ({...props}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "10vw",
        height: "10vh",
        background: "#141414",
        top: "3.5vw",
        right: "-3vw",
        borderRadius: "1vw",
        zIndex: 10,
        opacity: "1",
        display: "flex",
        flexDirection: "column",
        transform: "translateX(-40%)",
      }}
    >
      <div
        style={{ flex: 1, cursor: "pointer" }}
        onClick={() => {
          props.handleLogout();
        }}
      >
        <p style={{ fontSize: "1vw", fontWeight: 600, color: "white" }}>
          Logout
        </p>
      </div>
    </div>
  );
};
