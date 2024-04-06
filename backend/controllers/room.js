import db from "../db.js";

export const getAllRoom = async (req, res) => {
  console.log("all room",req.params.id);
  try {
    // Thực hiện truy vấn để lấy tất cả các phòng từ cơ sở dữ liệu
    const rooms = await db(`SELECT * FROM ChuDe WHERE id = ${req.query.id} `);
    res.json(rooms);
    // In ra kết quả
    console.log(rooms);
  } catch (err) {
    console.error("Error:", err);
  }
};

export const getAllRoomWithQuery = (req, res) => {
  res.json(`get all room: ${req.query.customerid === ""}`);
};
