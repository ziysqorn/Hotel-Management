import db from "../db.js";

// =========================STart of room
export const get = async (req, res) => {
  try {
    const data = await db("SELECT * FROM Room");
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getWithQuery = async (req, res) => {
  let { roomid, roomtypeid, RoomName } = req.query;
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
  if (RoomName) {
    finalQ += `AND Room.RoomId LIKE '%${RoomName}%'`;
  }

  finalQ += `;`;
  console.log(finalQ);

  // gửi query về db
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

// lấy thông tin như doanh thu của phòng front end sử lý trả về các order room kèm loại phòng để tính tiền
export const getRoomInfoComeWithRoomId = async (req, res) => {
  let { RoomId } = req.query;
  let finalQ = `
  SELECT o.CustomerId, o.StayCustomerId, o.UserId, o.RoomId, o.CheckInDate, o.ExpectedCHeckOutDate,
         r.RoomId, r.RoomTypeId, r.Status, r.Phone,
         rt.RoomTypeId, rt.Type, rt.Price, rt.Description
  FROM OrderRoom o
  JOIN Room r ON o.RoomId = r.RoomId
  JOIN RoomType rt ON r.RoomTypeId = rt.RoomTypeId where r.RoomId='${RoomId}';`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

// ==================END OF ROOM =============

// Nhận vào các giá trị tương ứng để insert

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
// lấy room nào còn phòng và cho thời gian cụ thể
export const getRoomWithDate = async (req, res) => {
  // input : ngày nhận phòng và ngày trả phòng
  let { CheckInDate, ExpectedCheckOutDate, RoomName, StayCustomerId } =
    req.query;

  console.log(`getRoomWithDate item : `, req.query);
  let finalQ = `     
        SELECT DISTINCT Room.RoomId, Room.RoomTypeId, Room.Status, Room.Phone
        FROM Room
            LEFT JOIN OrderRoom ON Room.RoomId = OrderRoom.RoomId
        WHERE ((OrderRoom.CheckInDate IS NULL)
            OR NOT (
                  (OrderRoom.CheckInDate BETWEEN '${CheckInDate}' AND '${ExpectedCheckOutDate}')
                AND (OrderRoom.ExpectedCheckOutDate BETWEEN '${CheckInDate}' AND '${ExpectedCheckOutDate}')
              )) 
  `;
  if (RoomName) finalQ += ` AND Room.RoomId LIKE '%${RoomName}%' `;
  if (StayCustomerId)
    finalQ += ` AND OrderRoom.StayCustomerId LIKE '%${StayCustomerId}%' `;
  finalQ += `;`;
  //  chạy query
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
  // res.json(finalQ)
};

export const getOrderRoomWithStayCustomerId = async (req, res) => {
  let { StayCustomerId } = req.query;
  let finalQ = `SELECT *
                  FROM OrderRoom
                  WHERE StayCustomerId = ${StayCustomerId}
                  ORDER BY CheckInDate DESC;
                  `;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
};

// Get các customer có trong phòng có hoặc không có time
export const getCustomerInRoom = async (req, res) => {
  //allTime true nghĩa là all khách đã từng ở phòng đó
  let { RoomId, CurrentTime, allTime } = req.query;
  console.log(CurrentTime);
  let finalQ = `SELECT * FROM OrderRoom 
                WHERE ('${CurrentTime}' BETWEEN CheckInDate AND ExpectedCHeckOutDate) 
                      AND RoomId= '${RoomId}';`;

  if (allTime) {
    finalQ = `SELECT DISTINCT StayCustomerId
              FROM OrderRoom WHERE RoomId='${RoomId}';`;
  }
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//delete
export const deleteOrderRoom = async (req, res) => {
  let { item } = req.body;

  let finalQ = `DELETE FROM OrderRoom
                  WHERE 
                      CustomerId = ${item.CustomerId} AND
                      StayCustomerId = ${item.StayCustomerId} AND
                      UserId = ${item.UserId} AND
                      RoomId = '${item.RoomId}' AND
                      CheckInDate = '${item.CheckInDate}' AND
                      ExpectedCHeckOutDate = '${item.ExpectedCHeckOutDate}';
  `;

  try {
    const data = await db(finalQ);
    res.json(`Order Room Delete success`);
  } catch (err) {
    console.log(err);
  }
};

export const editOrderRoom = async (req, res) => {
  let { OldItem, NewItem } = req.body;
  console.log(OldItem, NewItem);
  let finalQ = `UPDATE OrderRoom
                  SET 
                    CustomerId = ${NewItem.CustomerId} ,
                    StayCustomerId = ${NewItem.StayCustomerId} ,
                    UserId = ${NewItem.UserId} ,
                    RoomId = '${NewItem.RoomId}' ,
                    CheckInDate = '${NewItem.CheckInDate}' ,
                    ExpectedCHeckOutDate = '${NewItem.ExpectedCHeckOutDate}'
                  WHERE
                      CustomerId = ${OldItem.CustomerId} AND
                      StayCustomerId = ${OldItem.StayCustomerId} AND
                      UserId = ${OldItem.UserId} AND
                      RoomId = '${OldItem.RoomId}' AND
                      CheckInDate = '${OldItem.CheckInDate}' AND
                      ExpectedCHeckOutDate = '${OldItem.ExpectedCHeckOutDate}';
  `;
  try {
    const data = await db(finalQ);
    res.json(`Order Room Update success`);
  } catch (err) {
    console.log(err);
  }
  // res.json(finalQ);
  // commit change 
};


export const tempfunction = ()=>{
    console.log("work");
}