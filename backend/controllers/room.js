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
  let finalQ = `SELECT * FROM Room WHERE`;
  if (roomid) {
    finalQ += ` RoomId = '${roomid}';`;
  }
  if (roomtypeid) {
    finalQ += ` RoomTypeId = ${roomtypeid};`;
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
  // console.log(finalQ);
  try {
    const data = await db(finalQ);
    res.json(`Add item : ${item.RoomId} `);
  } catch (err) {
    console.log("err", err);
  }
};
