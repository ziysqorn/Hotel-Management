import db from "../db.js";

//Lấy service
export const get = async (req, res) => {
    try {
      const data = await db("SELECT * FROM Service");
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  };

  export const getWithQuery = async (req, res) =>{
    let {serviceid} = req.query
    let FinalQuery = 'SELECT * FROM Service WHERE NOT(Service.ServiceId IS NULL)'

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
}


  //Thêm dịch vụ
  export const AddService = async (req, res) => {
    let {item} = req.body;

    let FinalQuery = `INSERT INTO Service
    ( ServiceId, Name, Price, Description)
    VALUES
        (   
            '${item.ServiceId}',
            '${item.Name}',
            '${item.Price}',
            '${item.Description}' 
        );
        SELECT * FROM Service WHERE ServiceId = '${item.ServiceId}' `;
    try
    {
        const data = await db(FinalQuery);
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }
}

//Sửa dịch vụ
export const EditService = async (req, res) => {
    let item = req.body.item;
    let finalQ = `UPDATE Service
      SET 
          ServiceId = ${item.ServiceId},
          Name = ${item.Name},
          Price = '${item.Price}',
          Description = '${item.Description}',
      WHERE ServiceId ='${item.ServiceId}';`;
    console.log(finalQ);
    try {
      const data = await db(finalQ);
      res.json(`Update item: ${item.ServiceId} success!!! `);
    } catch (err) {
      console.log(err);
    }
  };

  //Xóa dịch vụ
  export const deleteService = async (req,res)=>{
    let {ServiceId} = item.query
    let finalQ = `DELETE FROM Service WHERE ServiceId = ${ServiceId}`
    try {
      const data = await db(finalQ);
      res.json("Delete Service success");
    } catch (err) {
      console.log("err", err);
    }
}

//Lấy UseService

export const getAllUseService = async (req, res) => {
  try {
    const data = await db("SELECT * FROM UseService");
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const getUseService = async (req,res) => {
  let {serviceid, customerid} = req.query
    let FinalQuery = 'SELECT * FROM UseService WHERE NOT(UseService.ServiceId IS NULL)'

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
}

//chỉnh sửa UseService
export const EditUseService = async (req, res) => {
    let item = req.body.item;
    let finalQ = `UPDATE UseService
      SET 
          ServiceId = ${item.ServiceId},
          CustomerId = ${item.CustomerId},
          UserId = ${item.UserID},
          CheckInDate = '${item.CheckInDate}'
      WHERE ServiceId ='${item.ServiceId}';`;
    console.log(finalQ);
    try {
      const data = await db(finalQ);
      res.json(`Update item: ${item.RoomId} success!!! `);
    } catch (err) {
      console.log(err);
    }
  };

  //thêm userService
  export const addUseService = async (req, res) => {
    let { item } = req.body;
  
    let finalQ = `
        INSERT INTO UseService
          (ServiceId,CustomerId,UserID,CheckInDate)
        VALUES
          ('${item.ServiceId}',${item.CustomerId},${item.UserID},'${item.CheckInDate}');
    `;
  
    let validationQ = `SELECT * FROM UseService WHERE ServiceId = '${item.ServiceId}'`;
    try {
      if (((await db(validationQ)).length = 0)) {
        const data = await db(finalQ);
        res.json(`Add item : ${item.ServiceId} `);
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

//Xóa UseService
  export const deleteUseService = async (req,res)=>{
    let {ServiceId} = item.query
    let finalQ = `DELETE FROM UseService WHERE ServiceId = ${ServiceId}`
    try {
      const data = await db(finalQ);
      res.json("Delete UseService success");
    } catch (err) {
      console.log("err", err);
    }
}


//Order Services
export const OrderService = async (req, res) => {
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
export const deleteOrderService = async (req, res) => {
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
  export const editOrderService = async (req, res) => {
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
