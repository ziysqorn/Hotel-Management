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
