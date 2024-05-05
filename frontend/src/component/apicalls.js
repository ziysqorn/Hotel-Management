import axios from "axios";
import { apiInfo } from "../apivar";
export const getAllOrderRoomWithRoomId = async (RoomId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/room/getOrderRoomWithQuery`,
      {
        params: {
          getAll: true,
          RoomName: RoomId,
        },
      }
    );
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.log(error);
    return null; // Trả về null trong trường hợp có lỗi
  }
};

export const getAllOrderRoomWithRoomIdAndCustomerId = (
  RoomId,
  CustomerId
) => {};

export const getCustomerInfoWithCustomterId = async (CustomerId) => {
  console.log(CustomerId);
  try {
    const res = await axios.get(`http://localhost:4000/api/customer/get/byId`, {
      params: {
        customerId: CustomerId,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getCustomerInfoWithQuery = async (query) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/api/customer/get/byName",
      {
        params: {
          customerName: query,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getServiceInfoWithQuery = async (query) => {
  try {
    const res = await axios.get("http://localhost:4000/api/service/query", {
      params: {
        Name: query,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const OrderRooms = async (list, cusInfo, UserId) => {
  console.log(list);
  console.log(cusInfo);

  list.forEach((room) => {
    room.allCustomer.forEach(async (cus) => {
      console.log(cus);
      let item = {
        CustomerId: cusInfo.CustomerId,
        StayCustomerId: cus.CustomerId,
        UserId: UserId,
        RoomId: room.RoomId,
        CheckInDate: `${room.startDate.year}-${room.startDate.month}-${room.startDate.date}`,
        ExpectedCHeckOutDate: `${room.endDate.year}-${room.endDate.month}-${room.endDate.date}`,
      };

      console.log(cusInfo.CustomerId, cus.CustomerId, UserId);

      try {
        await axios.post("http://localhost:4000/api/room/CreateOrderRoom", {
          item,
        });
      } catch (e) {
        console.log(e);
        return e;
      }
    });

    room.allService.forEach(async (ser) => {
      console.log(ser);
      let item = {
        CustomerId: cusInfo.CustomerId,
        ServiceId: ser.ServiceId,
        UserId: UserId,
        CheckInDate: `${room.startDate.year}-${room.startDate.month}-${room.startDate.date}`,
      };
      try {
        await axios.post("http://localhost:4000/api/service/addUseService", {
          item,
        });
      } catch (e) {
        console.log(e);
        return e
      }
    });
  });

  // return list;
};
