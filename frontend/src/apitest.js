import React from "react";
import axios from "axios";
const Apitest = () => {
  const getData = () => {
    axios
      .get("http://localhost:3000/api/room?roomtypeid=1")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postData = () => {
    axios
      .post("http://localhost:3000/api/room/post", {
        item: {
          RoomId:"P102",
          RoomTypeId: 1,
          Status: 1,
          Phone: "0900000000",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        style={{ width: 100, height: 100 }}
        onClick={() => {
          getData();
        }}
      >
        {" "}
        test{" "}
      </button>
    </div>
  );
};

export default Apitest;
