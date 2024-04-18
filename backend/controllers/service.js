import db from "../db.js";

//Lấy service --Đậu
export const get = async (req, res) => {
  try {
    const data = await db("SELECT * FROM Service");
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const getWithQuery = async (req, res) => {
  let { serviceid } = req.query;
  let FinalQuery = "SELECT * FROM Service WHERE NOT(Service.ServiceId IS NULL)";

  if (serviceid) {
    FinalQuery += ` AND ServiceId = ${serviceid}`;
  }

  FinalQuery += `;`;
  console.table(FinalQuery);

  try {
    const data = await db(FinalQuery);

    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//Thêm dịch vụ --Đậu --Khang duyệt
export const AddService = async (req, res) => {
  let { item } = req.body;

  let finalQ = `INSERT INTO Service (Name, Price, Description)
                  VALUES ('${item.Name}', ${item.Price}, '${item.Description}')`;

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

//Sửa dịch vụ --Đậu --Khang duyệt
export const EditService = async (req, res) => {
  let item = req.body.item;
  let finalQ = `UPDATE Service
      SET 
          Name = '${item.Name}',
          Price = '${item.Price}',
          Description = '${item.Description}'
      WHERE ServiceId =${item.ServiceId};`;

  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//Xóa dịch vụ --Đậu --Khang duyệt http://localhost:4000/api/service/delete?ServiceId=1004
export const deleteService = async (req, res) => {
  let { ServiceId } = req.query;
  let finalQ = `DELETE FROM Service WHERE ServiceId = ${ServiceId}`;
  // res.json(finalQ)
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log("err", err);
  }
};

//Lấy UseService --Đậu  -- Khang duyệt http://localhost:4000/api/service/getAllUseService
export const getAllUseService = async (req, res) => {
  try {
    const data = await db("SELECT * FROM UseService");
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
// lấy vs query -- Khang duyệt http://localhost:4000/api/service/getUseService?serviceid=1
export const getUseService = async (req, res) => {
  let { serviceid, customerid } = req.query;
  let FinalQuery =
    "SELECT * FROM UseService WHERE NOT(UseService.ServiceId IS NULL)";

  if (serviceid) {
    FinalQuery += ` AND ServiceId = ${serviceid}`;
  }
  if (customerid) {
    FinalQuery += ` AND CustomerId = ${customerid}`;
  }
  FinalQuery += `;`;
  console.table(FinalQuery);

  try {
    const data = await db(FinalQuery);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//chỉnh sửa UseService --Đậu -- Khang temp work
export const EditUseService = async (req, res) => {
  let oldItem = req.body.oldItem;
  let newItem = req.body.newItem;
  console.log(req.body);
  let finalQ = `UPDATE UseService
      SET 
          ServiceId = ${newItem.ServiceId},
          CustomerId = ${newItem.CustomerId},
          UserId = ${newItem.UserId},
          CheckInDate = '${newItem.CheckInDate}'
      WHERE  ServiceId = ${oldItem.ServiceId} AND
      CustomerId = ${oldItem.CustomerId} AND
      UserId = ${oldItem.UserId} AND
      CheckInDate = '${oldItem.CheckInDate}';`;

  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//thêm userService
export const addUseService = async (req, res) => {
  let { item } = req.body;

  let finalQ = `
        INSERT INTO UseService
          (ServiceId,CustomerId, UserId, CheckInDate)
        VALUES
          (${item.ServiceId},${item.CustomerId}, ${item.UserId}, '${item.CheckInDate}');
    `;

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
// -- Khang duyệt http://localhost:4000/api/service/deleteUseService
export const deleteUseService = async (req, res) => {
  let { item } = req.body;

  let finalQ = `DELETE FROM UseService 
                  WHERE 
                      ServiceId = ${item.ServiceId} AND
                      CustomerId = ${item.CustomerId} AND
                      UserId = ${item.UserId} AND
                      CheckInDate = '${item.CheckInDate}'; 
  `;

  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getServiceForRoom = async (req, res) => {
  let finalQ = `SELECT * FROM ServiceForRoom WHERE NOT(ServiceForRoom.RoomTypeId IS  NULL) `;
  let { ServiceId, RoomTypeId } = req.query;

  if (ServiceId) {
    finalQ += ` AND ServiceId = ${ServiceId}`;
  }
  if (RoomTypeId) {
    finalQ += ` AND RoomTypeId = ${RoomTypeId}`;
  }
  finalQ += `;`;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//Order Services ---Đậu
export const createServiceForRoom = async (req, res) => {
  let { item } = req.body;
  let finalQ = `     
        INSERT INTO ServiceForRoom
          (ServiceId,RoomTypeId)
        VALUES
          (${item.ServiceId},${item.RoomTypeId})
    `;
  try {
    const data = await db(finalQ);
    res.json("Order Service success");
  } catch (err) {
    console.log("err", err);
  }
  // res.json(finalQ);
};

//delete --- Đậu
export const deleteServiceForRoom = async (req, res) => {
  let { item } = req.body;

  let finalQ = `DELETE FROM ServiceForRoom
                    WHERE 
                        ServiceId = ${item.ServiceId} AND
                        RoomTypeId = ${item.RoomTypeId};
    `;
  try {
    const data = await db(finalQ);
    res.json(`Order Service Delete success`);
  } catch (err) {
    console.log(err);
  }
};

//edit order service
export const editServiceForRoom = async (req, res) => {
  let { OldItem, NewItem } = req.body;
  let finalQ = `UPDATE ServiceForRoom
                    SET 
                      ServiceId = ${NewItem.ServiceId} ,
                      RoomTypeId = ${NewItem.RoomTypeId} 
                    WHERE
                        ServiceId = ${OldItem.ServiceId} AND
                        RoomTypeId = ${OldItem.RoomTypeId} 
    `;
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
