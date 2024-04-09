import db from "../db.js";

export const get = async (req, res) => {
  try {
    const data = await db("SELECT * FROM Room");
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getWithQuery = async (req, res) => {
  let { roomid, roomtypeid } = req.query;
  // cách nào cũng dc
  let roomId = req.query.roomid;
  // handle query đến sql server
  let finalQ = `SELECT * FROM Room WHERE NOT(Room.RoomId IS NULL)`;
  if (roomid) {
    finalQ += `AND RoomId = '${roomid}'`;
  }
  if (roomtypeid) {
    finalQ += `AND RoomTypeId = ${roomtypeid}`;
  }
  console.log(finalQ);
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const EditRoom = async (req, res) => {
  let item = req.body.item;
  let finalQ = `UPDATE Room
    SET 
        RoomTypeId = ${item.RoomTypeId},
        Status = ${item.Status},
        Phone = '${item.Phone}'
    WHERE RoomId ='${item.RoomId}';`;
  console.log(finalQ);
  try {
    const data = await db(finalQ);
    res.json(`Update item: ${item.RoomId} success!!! `);
  } catch (err) {
    console.log(err);
  }
};

export const add = async (req, res) => {
  let { item } = req.body;
  let finalQ = `
      INSERT INTO Room
        (RoomId,RoomTypeId,Status,Phone)
      VALUES
        ('${item.RoomId}',${item.RoomTypeId},${item.Status},'${item.Phone}');
  `;

  console.log(finalQ);
  try {
    const data = await db(finalQ);
    res.json(`Add item : ${item.RoomId} `);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const OrderRoom = async (req, res) => {
  let { item } = req.body;
  console.log(`getRoomWithDate item : `, item);
  let finalQ = `     
      INSERT INTO OrderRoom
        (CustomerId,StayCustomerId,UserId,RoomId,CheckInDate,ExpectedCHeckOutDate)
      VALUES
        (${item.CustomerId},${item.StayCustomerId},${item.UserId},'${item.RoomId}', '${item.CheckInDate}', '${item.ExpectedCHeckOutDate}')
  `;
  try {
    const data = await db(finalQ);
    res.json("Order Room success");
  } catch (err) {
    console.log("err", err);
  }
  // res.json(finalQ);
};

// ==================END OF BASIC =============
// lấy room nào còn phòng và cho thời gian cụ thể
export const getRoomWithDate = async (req, res) => {
  // input : ngày nhận phòng và ngày trả phòng
  let { CheckInDate, ExpectedCheckOutDate } = req.query;

  console.log(`getRoomWithDate item : `, req.query);
  let finalQ = `     
  SELECT DISTINCT Room.RoomId, Room.RoomTypeId, Room.Status, Room.Phone
  FROM Room
      LEFT JOIN OrderRoom ON Room.RoomId = OrderRoom.RoomId
  WHERE ((OrderRoom.CheckInDate IS NULL)
      OR NOT (
            (OrderRoom.CheckInDate BETWEEN '${CheckInDate}' AND '${ExpectedCheckOutDate}')
          AND (OrderRoom.ExpectedCheckOutDate BETWEEN '${CheckInDate}' AND '${ExpectedCheckOutDate}')
        )) ;
  `;
  //  chạy query
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
};

export const getCustomerInRoom = (req, res) => {
  let { RoomId, Time } = req.query;
  
};
