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
        margin:"10px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: myAppColor.Black.TopNavBackground,
      }}
    >
      {/* top item */}
      <div
        style={{
          width: "100%",
          paddingTop: "0px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //   background: "white",
        }}
      >
        <FontAwesomeIcon
          style={{ marginLeft: "10px", fontSize: "30px", color: "white" }}
          icon={faBed}
        />
        <p
          style={{
            color: "white",
            backgroundColor: "black",
            maxWidth: 150,
            fontSize: "20px",
            fontWeight: 600,
            // margin: "auto",
            alignSelf: "center",
            transform: "translate(-10%,0)",
            textAlign: "center",
            padding: "7px",
            borderRadius: "3px",
          }}
        >
          Floor No. {`01`}
        </p>
        <div></div>
      </div>

      <div
        style={{
          flex: "1",
          // backgroundColor: "white",

          display: "flex",

          flexWrap: "wrap",
        }}
      >
        {props.data.map((item, index) => (
          <div
            key={index}
            style={{
              width: "53px",
              cursor:"pointer",
              height: "36px",
              backgroundColor: item.Status?"#111111":"#FF0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1px 5px",
              borderRadius: "3px",
            }}
          >
            <p style={{ color:item.Status?"#B0B0B0":"white" }}>{item.RoomName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
