import React, { useEffect } from "react";
import { myAppColor } from "../../colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

export const Floor = ({ ...props }) => {
  useEffect(() => {
    console.log(props.data);
  });
  return (
    <div
      style={{
        width: "639px",
        height: "410px",
        borderRadius: "10px",
        backgroundColor: myAppColor.Black.TopNavBackground,
      }}
    >
      {/* top item */}
      <div
        style={{
          width: "100%",
          paddingTop: "0px",
          display: "flex",
          flexDirection:"row",
          justifyContent: "space-between",
          alignItems: "center",
        //   background: "white",
        }}
      >
        <FontAwesomeIcon style={{marginLeft:"10px",fontSize:"30px",color:"white"}} icon={faBed} />
        <p
          style={{
            color: "white",
            backgroundColor: "black",
            maxWidth: 100,
            // margin: "auto",
            alignSelf:"center",
            transform:"translate(-10%,0)",
            textAlign: "center",
            padding: "5px",
            borderRadius: "3px",
          }}
        >
          Floor No. {`07`}
        </p>
        <div></div>
      </div>
    </div>
  );
};
