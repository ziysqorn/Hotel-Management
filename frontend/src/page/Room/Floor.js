import React from "react";
import { myAppColor } from "../../colors";
import "./style.css";
export const Floor = ({ ...props }) => {
  // useEffect(() => {
  //   console.log("work")
  // }, []);
  const removePword = (item) => {
    return item.slice(1);
  };
  return (
    <div
      style={{
        width: "100%", //80%
        height: "100%",
        margin: "10px",
        padding: "5px",
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
          paddingBottom: "4%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "4vw",
            height: "4vh",
            marginLeft: "0px",
            color: "white",
          }}
          class="material-symbols-light--bed-outline"
        ></span>
        <p
          style={{
            color: "white",
            backgroundColor: "black",
            maxWidth: 150,
            fontSize: "20px",
            fontWeight: 600,
            alignSelf: "center",
            transform: "translate(-10%,0)",
            textAlign: "center",
            padding: "7px",
            borderRadius: "3px",
          }}
        >
          Floor No. {removePword(props.floorIndex)}
        </p>
        <div></div>
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {props.data.map(
          (item, index) =>
            item.RoomId.includes(props.floorIndex) && (
              <SmallRoom key={index} index={index} item={item} />
            )
        )}
      </div>
    </div>
  );
};

const SmallRoom = ({ item, index }) => {
  const removePword = (item) => {
    return item.slice(1);
  };
  return (
    <div
      key={index}
      style={{
        width: "10%", //53px
        // maxWidth: "100px",
        minWidth: "2vw",
        cursor: "pointer",
        height: "8%",
        backgroundColor: item.Status ? "#111111" : "#FF0000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "1px 5px",
        padding: "4px 8px",
        borderRadius: "8px",
      }}
    >
      <p
        style={{
          // margin:"auto 100px",
          color: item.Status ? "#B0B0B0" : "white",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        {removePword(item.RoomId)}
      </p>
    </div>
  );
};
