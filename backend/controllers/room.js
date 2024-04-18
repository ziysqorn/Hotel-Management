import db from "../db.js";

// =========================STart of room
// ============BASIC CURD=============

// lấy all từ bản Room
export const get = async (req, res) => {
  try {
    const data = await db("SELECT * FROM Room;");
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// lấy all từ Room và có thể có điều kiện như có kèm RoomId,RoomTypeId, RoomName(nhập 1 phàn roomId)
export const getWithQuery = async (req, res) => {
  let { roomid, RoomTypeId, RoomName, Status } = req.query;
  // cách nào cũng dc
  let roomId = req.query.roomid;
  // handle query đến sql server
  let finalQ = `SELECT * FROM Room WHERE NOT(Room.RoomId IS NULL) `;
  if (roomid) {
    finalQ += ` AND RoomId = '${roomid}'`;
  }
  if (RoomTypeId) {
    finalQ += ` AND RoomTypeId = ${RoomTypeId}`;
  }
  if (Status) {
    finalQ += ` AND Status = ${Status} `;
  }

  if (RoomName) {
    finalQ += ` AND Room.RoomId LIKE '%${RoomName}%' `;
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

// Update MỘT Hàng Room
export const UpdateRoom = async (req, res) => {
  let item = req.body.item;
  let finalQ = `UPDATE Room
  SET 
  RoomTypeId = ${item.RoomTypeId},
  Status = ${item.Status},
  Phone = '${item.Phone}'
  WHERE RoomId ='${item.RoomId}';`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Tạo 1 Hàng Room
export const CreateRoom = async (req, res) => {
  let { item } = req.body;

  let finalQ = `
  INSERT INTO Room
  (RoomId,RoomTypeId,Status,Phone)
  VALUES
  ('${item.RoomId}',${item.RoomTypeId},${item.Status},'${item.Phone}');
  `;

  let validationQ = `SELECT * FROM Room WHERE RoomId = '${item.RoomId}'`;
  try {
    if ((await db(validationQ)).recordset.length == 0) {
      const data = await db(finalQ);
      res.json(data);
    } else {
      res.status(500).json(`Missing in error`);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

// Xóa 1 hàng Room bằng RoomId
export const DeleteRoom = async (req, res) => {
  let { RoomId } = req.query;
  let finalQ = `DELETE FROM Room WHERE RoomId = '${RoomId}'`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
};

// ============END OF BASIC CURD=============
//Lấy gộp 3 bản và search theo RoomId
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
export const CreateOrderRoom = async (req, res) => {
  let { item } = req.body;
  let finalQ = `     
      INSERT INTO OrderRoom
        (CustomerId,StayCustomerId,UserId,RoomId,CheckInDate,ExpectedCHeckOutDate)
      VALUES
        (${item.CustomerId},${item.StayCustomerId},${item.UserId},'${item.RoomId}', '${item.CheckInDate}', '${item.ExpectedCHeckOutDate}')
  `;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
  // res.json(finalQ);
};
// lấy room nào CÒN PHÒNG và cho thời gian cụ thể, có các filter thêm như RoomId và RoomTypeId
export const getRoomWithDate = async (req, res) => {
  // input : ngày nhận phòng và ngày trả phòng
  let { CheckInDate, ExpectedCheckOutDate, RoomName, RoomTypeId } = req.query;

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
  if (RoomTypeId) finalQ += `AND RoomTypeId = ${RoomTypeId} `;

  finalQ += `;`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
};
// thường dùng để lấy các orderRoom để tính tiền thanh toán
export const getOrderRoomWithQuery = async (req, res) => {
  let {
    CheckInDate,
    ExpectedCheckOutDate,
    CustomerId,
    StayCustomerId,
    RoomName,
    getAll,
  } = req.query;

  let finalQ = `SELECT ${
    getAll ? `*` : `DISTINCT OrderRoom.RoomId, CheckInDate, ExpectedCHeckOutDat`
  } FROM OrderRoom WHERE  (OrderRoom.CheckInDate BETWEEN '${CheckInDate}' AND '${ExpectedCheckOutDate}')
  AND (OrderRoom.ExpectedCHeckOutDate BETWEEN '${CheckInDate}' AND '${ExpectedCheckOutDate}') `;
  if (CustomerId) finalQ += ` AND CustomerId = ${CustomerId}`;
  if (StayCustomerId) finalQ += ` AND StayCustomerId = ${StayCustomerId}`;
  if (RoomName) finalQ += ` AND RoomId Like '%${RoomName}%'`;
  finalQ += `;`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
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
// lấy all khách đang ở trong phòng
export const getAllCusomterInRoom = async (req, res) => {
  let { CurrentTime } = req.query;
  let finalQ = `SELECT DISTINCT Customer.*
  FROM Customer
  INNER JOIN OrderRoom ON Customer.CustomerId = OrderRoom.StayCustomerId
  WHERE '${CurrentTime}' BETWEEN OrderRoom.CheckInDate AND OrderRoom.ExpectedCheckOutDate;`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
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
export const DeleteOrderRoom = async (req, res) => {
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

export const UpdateOrderRoom = async (req, res) => {
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
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const ReadOrderRoom = async (req, res) => {
  let {pageIndex,pageAmount} = req.query

  let finalQ = `SELECT * FROM OrderRoom LIMIT  `;
  if(pageAmount){
    finalQ += `${pageAmount}`
  }else finalQ += `${pageAmount}`
  if(pageIndex){
    finalQ += ` OFFSET ${pageIndex}`
  } else finalQ += ` OFFSET 0`
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
// roomtype
export const CreateRoomType = async (req, res) => {
  let { Type, Price, Description } = req.body.item;

  let finalQ = `INSERT INTO RoomType
                  (Type,Price,description)
                  VALUES
                  ('${Type}',${Price},'${Description}');  `;
  try {
    if (
      (await db(`SELECT * FROM RoomType WHERE Type = '${Type}'`))
        .rowsAffected == 0
    ) {
      const data = await db(finalQ);
      res.json(data);
    } else {
      res.json("Đã tồn tại trên hệ thống");
    }
  } catch (err) {
    console.log(err);
  }
};

export const ReadRoomType = async (req, res) => {
  let finalQ = `SELECT * FROM RoomType;`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const UpdateRoomType = async (req, res) => {
  let { RoomTypeId, Type, Price, Description } = req.body.item;
  let finalQ = `UPDATE RoomType 
                  SET 
                  Type = '${Type}',
                  Price = ${Price},
                  Description = '${Description}'
                  WHERE RoomTypeId = ${RoomTypeId};`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const DeleteRoomType = async (req, res) => {
  let { RoomTypeId } = req.body.item;
  let finalQ = `DELETE FROM RoomType WHERE RoomTypeId = ${RoomTypeId} `;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
