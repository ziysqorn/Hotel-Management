import React from "react";

export const OrderRoom = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        // background: "white",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      {/* top nav */}
      <div
        style={{
          minHeight: "10vh",
          border: "1px solid white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center ",
        }}
      >
        <div>arrow</div>
        <div>
          <p style={{ fontSize: "1vw" }}>Booking room</p>
        </div>
        <div></div>
      </div>
      <div style={{ flex: 1, border: "1px solid blue" }}></div>
    </div>
  );
};
