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

//Thêm dịch vụ --Đậu
export const AddService = async (req, res) => {
  let { item } = req.body;

  let finalQ = `INSERT INTO Service (Name, Price, Description)
                  VALUES ('${item.Name}', ${item.Price}, '${item.Description}')`;

  //let validationQ = `SELECT * FROM Service WHERE ServiceId = '${item.ServiceId}'`;

  try {
    const validationRes = await db(validationQ);
    if (validationRes.recordset.length === 0) {
      const data = await db(finalQ);
      res.json(data);
    } else {
      res.status(500).json("ServiceId already exists");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

//Sửa dịch vụ --Đậu
export const EditService = async (req, res) => {
  let item = req.body.item;
  let finalQ = `UPDATE Service
      SET 
          Name = '${item.Name}',
          Price = '${item.Price}',
          Description = '${item.Description}'
      WHERE ServiceId =${item.ServiceId};`;
  console.log(finalQ);
  try {
    const data = await db(finalQ);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//Xóa dịch vụ --Đậu
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

//Lấy UseService --Đậu

export const getAllUseService = async (req, res) => {
  try {
    const data = await db("SELECT * FROM UseService");
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

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

//chỉnh sửa UseService --Đậu
export const EditUseService = async (req, res) => {
  let oldItem = req.body.oldItem;
  let newItem = req.body.newItem;
  let finalQ = `UPDATE UseService
      SET 
          ServiceId = ${newItem.ServiceId},
          CustomerId = ${newItem.CustomerId},
          UserId = ${newItem.UserID},
          CheckInDate = '${newItem.CheckInDate}'
      WHERE  ServiceId = ${oldItem.ServiceId} AND
      CustomerId = ${oldItem.CustomerId} AND
      UserId = ${oldItem.UserID} AND
      CheckInDate = '${oldItem.CheckInDate}';`;
  console.log(finalQ);
  try {
    const data = await db(finalQ);
    res.json(`Update item: ${oldItem.RoomId} success!!! `);
  } catch (err) {
    console.log(err);
  }
};

//thêm userService
export const addUseService = async (req, res) => {
  let { item } = req.body;

  let finalQ = `
        INSERT INTO UseService
          (CustomerId, UserID, CheckInDate)
        VALUES
          (${item.CustomerId}, ${item.UserID}, '${item.CheckInDate}');
    `;

  let validationQ = `SELECT * FROM UseService WHERE ServiceId = '${item.ServiceId}'`;
  try {
    const validationRes = await db(validationQ);
    if (validationRes.recordset.length === 0) {
      const data = await db(finalQ);
      res.json(data);
    } else {
      res.status(500).json("ServiceId already exists");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

//Xóa UseService
// export const deleteUseService = async (req, res) => {
//   let { ServiceId } = req.query;
//   let finalQ = `DELETE FROM UseService WHERE ServiceId = ${ServiceId}`;
//   try {
//     const data = await db(finalQ);
//     res.json("Delete UseService success");
//   } catch (err) {
//     console.log("err", err);
//   }
// };
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
    res.json(`Order UseService Delete success`);
  } catch (err) {
    console.log(err);
  }
};

//Order Services
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

//delete
export const deleteServiceForRoom = async (req, res) => {
  let { item } = req.body;

  let finalQ = `DELETE FROM ServiceForRoom
                    WHERE 
                        ServiceId = ${item.CustomerId} AND
                        RoomTypeId = ${item.StayCustomerId};
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
  console.log(OldItem, NewItem);
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
    res.json(`Order Service Update success`);
  } catch (err) {
    console.log(err);
  }
  // res.json(finalQ);
  // commit change
};

export const tempfunction = () => {
  console.log("work");
};
