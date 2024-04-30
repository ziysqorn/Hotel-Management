import axios from "axios";
import { apiInfo} from "../apivar";
export const getAllOrderRoomWithRoomId = async (RoomId) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/room/getOrderRoomWithQuery`, {
      params: {
        getAll: true,
        RoomName: RoomId,
      },
    });
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.log(error);
    return null; // Trả về null trong trường hợp có lỗi
  }
};
