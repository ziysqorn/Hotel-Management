import axios from "axios";
import { apiInfo } from "../apivar";

export const login = async (username, password) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/employee/employ/loginuser`,
      {
        item: {
          Phone: username,
          Password: password,
        },
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

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

export const getUseServiceWithStartDateAndEndDate = async (
  cusId,
  startDate,
  endDate
) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/service/getUseServiceWithStartDateAndEndDate`,
      {
        params: {
          CheckInDate: startDate,
          ExpectedCheckOutDate: endDate,
          CustomerId: cusId,
        },
      }
    );

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getServiceInfoWithServiceId = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/service/query`,
      {
        params: {
          serviceid: id,
        },
      }
    );

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getRoomInfoWithRoomId = async (id) => {
  console.log(id);
  try {
    const { data } = await axios.get(`http://localhost:4000/api/room/query`, {
      params: {
        RoomId: id,
      },
    });
    return data;
  } catch (e) {
    return e;
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
        return e;
      }
    });
  });
};

export const getRoomTypeWithQuery = async (RoomTypeId) => {
  console.log("got called");
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/room/ReadRoomType`,
      {
        params: {
          RoomTypeId: RoomTypeId,
        },
      }
    );

    console.log(data.recordset[0]);
    return data.recordset[0];
  } catch (e) {}
};

export const getAllRoomType = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/room/ReadRoomType`,
      {}
    );

    console.log(data.recordset);
    return data.recordset;
  } catch (e) {}
};

export const getOrderRoomWithCustomerIdStartDateEndDate = async (
  CusId,
  StartDate,
  EndDate
) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/room/getOrderRoomWithStartDateEndDateCustomerId`,
      {
        params: {
          CheckInDate: StartDate,
          ExpectedCheckOutDate: EndDate,
          CustomerId: CusId,
        },
      }
    );
    console.log(data.recordset);
    return data;
  } catch (e) {
    return e;
  }
};

export const getAllCusomterWithPhoneNum = async (item) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/customer/get/byPhoneNumber`,
      {
        params: {
          phoneNumber: item,
        },
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

export const getAllRoom = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/api/room/get`);
    console.log(data.recordset);
    return data;
  } catch (e) {
    return e;
  }
};

export const CreateBill = async (
  CusId,
  UserId,
  Status,
  TotalPrice,
  StartDate,
  EndDate
) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/room/CreateBill`,
      {
        item: {
          CheckInDate: StartDate,
          CheckOutDate: EndDate,
          CustomerId: CusId,
          UserId: UserId,
          Status: Status,
          TotalPrice: TotalPrice,
        },
        // console.log();
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getAllBillWithCusId = async (cusId) => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/room/ReadBill",
      {
        params: {
          CustomerId: cusId,
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const UpdateBill = async (info) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/room/ReadBill",
      {
        item: {
          ...info,
        },
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

export const ReadBillJoinCustomer = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/room/ReadBillJoinCustomer`
    );
    return data;
  } catch (e) {
    return e;
  }
};
