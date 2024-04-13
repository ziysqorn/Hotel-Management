import React from "react";
import axios from "axios";

const Apitest = () => {
  const getData = () => {
    axios
      .get("http://localhost:4000/api/room/query", {
        params: {
          RoomName: "P1",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postData = () => {
    axios
      .post("http://localhost:4000/api/room/post", {
        item: {
          RoomId: "P102",
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

  const addData = () => {
    axios
      .post("http://localhost:4000/api/room/add", {
        item: {
          RoomId: "P406",
          RoomTypeId: 3,
          Status: 1,
          Phone: "0900082400",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataWithDate = () => {
    axios
      .get("http://localhost:4000/api/room/getRoomWithDate", {
        params: {
          CheckInDate: "2024-04-20",
          ExpectedCheckOutDate: "2024-04-30",
          RoomName: "P101",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const OrderRoom = () => {
    axios
      .post("http://localhost:4000/api/room/orderRoom", {
        item: {
          CustomerId: 3,
          StayCustomerId: 1,
          UserId: 1,
          RoomId: "P102",
          CheckInDate: "2024-04-20",
          ExpectedCHeckOutDate: "2024-04-30",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // query handle
  const getCustomerInRoom = () => {
    axios
      .get("http://localhost:4000/api/room/getCustomerInRoom", {
        params: {
          RoomId: "P102",
          // CurrentTime: "2024-04-25",
          allTime: true,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

<<<<<<< HEAD
  const deleteOrderRoom = () => {
    axios
      .post("http://localhost:4000/api/room/deleteOrderRoom", {
        item: {
          CustomerId: 3,
          StayCustomerId: 2,
          UserId: 1,
          RoomId: "P102",
          CheckInDate: "2024-04-20",
          ExpectedCHeckOutDate: "2024-04-30",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editOrderRoom = () => {
    axios
      .post("http://localhost:4000/api/room/editOrderRoom", {
        OldItem: {
          CustomerId: 3,
          StayCustomerId: 2,
          UserId: 1,
          RoomId: "P102",
          CheckInDate: "2024-04-20",
          ExpectedCHeckOutDate: "2024-04-30",
        },
        NewItem: {
          CustomerId: 3,
          StayCustomerId: 3,
          UserId: 1,
          RoomId: "P103",
          CheckInDate: "2024-05-01",
          ExpectedCHeckOutDate: "2024-05-08",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOrderRoomWithStayCustomerId = () => {
    axios
      .get("http://localhost:4000/api/room/getOrderRoomWithStayCustomerId", {
        params: {
          StayCustomerId: 1,
          // allTime: true,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRoomInfoComeWithRoomId = () => {
    axios
      .get("http://localhost:4000/api/room/getRoomInfoComeWithRoomId", {
        params: {
          RoomId: "P102",
          // allTime: true,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
=======
  const GetEmployeeData = () => {
    axios
    .get("http://localhost:4000/api/employee?rolesid=2", {
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  // query handle
>>>>>>> Hung

  return (
    <div>
      <button
        style={{ width: 100, height: 100 }}
        onClick={() => {
<<<<<<< HEAD
          getCustomerInRoom();
=======
          getData();
          GetEmployeeData();
>>>>>>> Hung
        }}
      >
        Test
      </button>
    </div>
  );
};

export default Apitest;
