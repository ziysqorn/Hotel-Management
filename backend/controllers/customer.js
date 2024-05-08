import sql from "mssql";
import db from "../db.js";

//Create customer data -- Khang duyệt NOTE:insert ko để type bằng 0 được http://localhost:4000/api/customer/create
export async function CreateCustomer(req, res) {
  try {
    const data = req.body;
    if(!data.FullName || !data.PersonalId || !data.Type){
      res.status(400).send("Không được để trống họ tên, CCCD và loại khách hàng")
      return
    }
    if(!/^[\p{L}\s]+$/u.test(data.FullName)){
      res.status(400).send("Họ tên khách hàng chỉ bao gồm chữ cái, không được chứa chữ số và kí tự đặc biệt")
      return
    }
    if(!/^\d{12}$/.test(data.PersonalId)){
      res.status(400).send("Số CCCD chỉ bao gồm chữ số và có độ dài 12 kí tự")
      return
    }
    if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where PersonalId = '${data.PersonalId}'`)).recordset[0].Count) > 0){
      res.status(400).send("Số CCCD đã tồn tại trong hệ thống")
      return
    }
    if(data.Phone){
      if(!/^\d{10,11}$/.test(data.Phone)){
        res.status(400).send("Số điện thoại của khách hàng chỉ chứa chữ số và có độ dài tối thiểu là 10 kí tự và tối đa 11 kí tự")
        return
      }
      if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where Phone = '${data.Phone}'`)).recordset[0].Count) > 0){
        res.status(400).send("Số điện thoại đã tồn tại trong hệ thống")
        return
      }
    }
    if(!/^[1-3]$/.test(data.Type)){
      res.status(400).send("Loại khách hàng chỉ chứa 1 chữ số có giá trị từ 1 đến 3")
      return
    }
    const result =
      await db(`INSERT INTO Customer (FullName,PersonalId,Phone,Address,Type) values 
    (N'${data.FullName}', 
    '${data.PersonalId}', 
    ${data.Phone ? `'${data.Phone}'` : null}, 
    ${data.Address ? `N'${data.Address}'` : null}, 
    ${data.Type})
    Select * from Customer
    `);
    console.log(result);
    res.send({
      message: "Thêm dữ liệu khách hàng thành công !",
      customers: result.recordset,
    });
  } catch (err) {
    const countResult = (await db(`Select COUNT(*) as 'Count' from Customer`))
      .recordset[0].Count;
    await db(`DBCC CHECKIDENT ('Customer', RESEED, ${countResult + 1})`);
    console.log(err);
    res.send(err);
  }
}

//Read all customer data -- Khang duyệt http://localhost:4000/api/customer/get/all
export async function ReadAllCustomer(req,res){
    try {
        const data = await db("SELECT * FROM Customer");
        res.send(data.recordset)
      } catch (err) {
        console.log(err);
        res.send(err)
    }
}

//Read number of customers 
export async function NumberOfCustomers(req, res){
  try{
    const data = await db("SELECT COUNT(*) as 'result' FROM Customer")
    res.send(data.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

//Read number of customers currently in hotel
export async function NumberOfCustomersInHotel(req, res){
  try{
    const data = await db("Select COUNT(*) as 'result' from OrderRoom where GETDATE() between CheckInDate and ExpectedCHeckOutDate")
    res.send(data.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

//Read number of customers currently outside hotel
export async function NumberOfCustomerOutside(req, res){
  try{
    const data = await db(`Select COUNT(*) as 'result' from (
      Select * from Customer
      except
      select Customer.CustomerId, FullName, PersonalId, Phone, Address, Type from Customer
      join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
      where GETDATE() between CheckInDate and ExpectedCHeckOutDate) a`)
    res.send(data.recordset)
  } catch (err){
    console.log(err)
    res.send(err)
  }
}

//Read customer data by customerId -- Khang duyệt -- http://localhost:4000/api/customer/get/byId?customerId=1
export async function ReadCustomerById(req, res) {
  try {
    const customerId = req.query.customerId
    if(!customerId){
      res.status(400).send("Chưa truyền vào ID của khách hàng muốn tìm")
      return
    }
    const result = await db(
      `SELECT * FROM Customer where CustomerId = ${customerId}`
    );
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

//Read customer data by personalId -- Khang Duyệt -- http://localhost:4000/api/customer/get/byPersonalId?personalId=123456789
export async function ReadCustomerByPersonalId(req, res){
  try{
    const personalId = req.query.personalId
    if(!personalId){
      res.status(400).send("Chưa truyền vào số CCCD của khách hàng muốn tìm")
      return
    }
    const result = await db(
      `SELECT * FROM Customer where PersonalId LIKE '%${personalId}%'`
    );
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

//Read customer data by phone number -- Khang duyệt -- http://localhost:4000/api/customer/get/byPhoneNumber?phoneNumber=123-456-789
export async function ReadCustomerByPhoneNumber(req, res){
  try{
    const phoneNumber = req.query.phoneNumber
    if(!phoneNumber){
      res.status(400).send("Chưa truyền vào số điện thoại của khách hàng muốn tìm")
      return
    }

    const result = await db(
      `SELECT * FROM Customer where Phone LIKE '%${phoneNumber}%'`
    );

    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

//Read revenue from a customer -- Khang duyệt -- http://localhost:4000/api/customer/get/totalSpent?customerId=1
export async function ReadCustomerTotalSpent(req, res){
  try{
    const customerId = req.query.customerId
    if(!customerId){
      res.status(400).send("Chưa truyền vào ID của khách hàng muốn tìm")
      return
    }
    const result = await db(
      `SELECT SUM(TotalPrice) AS TotalSpent from Bill where CustomerId = ${customerId}`
    );
    res.send(result.recordset[0]);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

//Read customer by name -- Khang duyệt-- http://localhost:4000/api/customer/get/byName?customerName=John
export async function ReadCustomerByName(req, res){
  try{
    const customerName = req.query.customerName
    if(!customerName){
      res.status(400).send("Chưa truyền vào tên của khách hàng muốn tìm")
      return
    }
    if(!/^[\p{L}\s]+$/u.test(customerName)){
      res.status(400).send("Họ tên khách hàng chỉ bao gồm chữ cái, không được chứa chữ số và kí tự đặc biệt")
      return
    }
    const result = await db(`Select * from Customer where FullName LIKE N'%${customerName}%'`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}


//Read current customers in hotel
export async function ReadCurrentCustomersInHotel(req, res){
  try{
    const result = await db(`Select * from Customer
    join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
    where GETDATE() between CheckInDate and ExpectedCHeckOutDate`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}


//Read customer current in hotel by ID
export async function ReadInHotelById(req, res){
  try {
    const customerId = req.query.customerId
    if(!customerId){
      res.status(400).send("Chưa truyền vào ID của khách hàng muốn tìm");
      return
    }
    const result = await db(`Select * from Customer
    join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
    where GETDATE() between CheckInDate and ExpectedCHeckOutDate and Customer.CustomerId = ${customerId}`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

//Read customer current in hotel by Personal ID
export async function ReadInHotelByPersonalId(req, res){
  try {
    const personalId = req.query.personalId
    if(!personalId){
      res.status(400).send("Chưa truyền vào số CCCD của khách hàng muốn tìm")
      return
    }
    const result = await db(`Select * from Customer
    join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
    where GETDATE() between CheckInDate and ExpectedCHeckOutDate and Customer.PersonalId like '%${personalId}%'`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

//Read customer current in hotel by Phone number
export async function ReadInHotelByPhoneNumber(req, res){
  try {
    const phoneNumber = req.query.phoneNumber
    if(!phoneNumber){
      res.status(400).send("Chưa truyền vào số điện thoại của khách hàng muốn tìm")
      return
    }
    const result = await db(`Select * from Customer
    join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
    where GETDATE() between CheckInDate and ExpectedCHeckOutDate and Customer.Phone like '%${phoneNumber}%'`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

//Read customer current in hotel by customer name
export async function ReadInHotelByName(req, res){
  try {
    const customerName = req.query.customerName
    if(!customerName){
      res.status(400).send("Chưa truyền vào tên của khách hàng muốn tìm")
      return
    }
    if(!/^[\p{L}\s]+$/u.test(customerName)){
      res.status(400).send("Họ tên khách hàng chỉ bao gồm chữ cái, không được chứa chữ số và kí tự đặc biệt")
      return
    }
    const result = await db(`Select * from Customer
    join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
    where GETDATE() between CheckInDate and ExpectedCHeckOutDate and Customer.FullName like N'%${customerName}%'`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

//Read customer current in hotel by customer type
export async function ReadInHotelByType(req, res){
  try {
    const customerType = req.query.customerType
    if(!customerType){
      res.status(400).send("Chưa truyền vào loại khách hàng muốn tìm")
      return
    }
    var newType = 0;
    if(customerType === 'VIP') newType = 1
    else if(customerType === 'Premium') newType = 2;
    else if(customerType === 'Normal') newType = 3;
    else{
      res.status(400).send("Loại khách hàng chỉ có 3 giá trị là VIP, Premium hoặc Normal")
      return
    }
    const result = await db(`Select * from Customer
    join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
    where GETDATE() between CheckInDate and ExpectedCHeckOutDate and Customer.Type = ${newType}`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}


//Read customer residence history by ID
export async function ReadResidenceHistory(req, res){
  try {
    const customerId = req.query.customerId
    if(!customerId){
      res.status(400).send("Chưa truyền vào ID của khách hàng muốn tìm");
      return
    }
    const result = await db(`Select Customer.FullName as 'PayCustomer', Convert(varchar, CheckInDate, 13) as 'CheckInDate', Convert(varchar, ExpectedCHeckOutDate, 13) as 'ExpectedCHeckOutDate', RoomId, COUNT(StayCustomerId) as 'Members' from OrderRoom 
    join Customer on Customer.CustomerId = OrderRoom.CustomerId
    where CheckInDate IN (Select CheckInDate from OrderRoom where OrderRoom.StayCustomerId = ${customerId}) and 
    RoomId IN (select RoomId from OrderRoom where OrderRoom.StayCustomerId = ${customerId})
    group by Customer.FullName, CheckInDate, ExpectedCHeckOutDate, RoomId
    `)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

//Read customer by customer type -- Khang duyệt -- http://localhost:4000/api/customer/get/byType?customerType=0
export async function ReadCustomerByType(req, res){
  try{
    const customerType = req.query.customerType
    if(!customerType){
      res.status(400).send("Chưa truyền vào loại khách hàng muốn tìm")
      return
    }
    var newType = 0;
    if(customerType === 'VIP') newType = 1
    else if(customerType === 'Premium') newType = 2;
    else if(customerType === 'Normal') newType = 3;
    else{
      res.status(400).send("Loại khách hàng chỉ có 3 giá trị là VIP, Premium hoặc Normal")
      return
    }
    const result = await db(`Select * from Customer where Type = ${newType}`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}


//Read customer by many filters -- chưa duyệt nhưng thấy đúng =))
export async function ReadCustomerByManyFilters(req, res){
  try{
    const data = req.body
    if(!data){
      res.status(400).send("Chưa truyền thông tin nào của khách hàng muốn tìm")
      return
    }
    var query = `Select * from Customer where 
    ${data.CustomerId ? `CustomerId = ${data.CustomerId} and ` : ``}
    ${data.FullName ? `FullName LIKE N'%${data.FullName}%' and ` : ``}
    ${data.PersonalId ? `PersonalId LIKE '%${data.PersonalId}%' and ` : ``}
    ${data.Phone ? `Phone LIKE '%${data.Phone}%' and ` : ``}
    ${data.Address ? `Address LIKE N'%${data.Address}%' and ` : ``}
    ${data.Type ? `Type = ${data.Type} and ` : ``}`;
    var finalQuery = query.substring(0, query.length - 4);
    console.log(finalQuery);
    const result = await db(finalQuery);
    res.send(result.recordset);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

//Delete customer data by customerId
export async function DeleteCustomer(req, res){
  try{
    const customerId = req.query.customerId
    if(!customerId){
      res.status(400).send("Chưa truyền vào ID của khách hàng muốn xóa")
      return
    }
    const countResult = (
      await db(`select COUNT(*) as 'Count' from OrderRoom where OrderRoom.CustomerId = ${customerId} or OrderRoom.StayCustomerId = ${customerId}
    select COUNT(*) as 'Count' from UseService where UseService.CustomerId = ${customerId}
    select COUNT(*) as 'Count' from Bill where Bill.CustomerId = ${customerId}
    select COUNT(*) as 'Count' from Customer where Customer.CustomerId = ${customerId}`)).recordsets
    var counter = 0
    for(let table of countResult) counter += parseInt(table[0].Count)
    if(counter > 1){
      res.status(400).send("Không thể xóa khách hàng vì hệ thống vẫn đang sử dụng dữ liệu của khách hàng này")
      return
    }
    else if(counter == 0){
      res.status(400).send("Dữ liệu khách hàng không tồn tại trong hệ thống !")
      return
    }
    const result = await db(
      `Delete from Customer where CustomerId = ${customerId} Select * from Customer`
    );
    console.log(result);
    res.send({
      message: "Xóa dữ liệu khách hàng thành công !",
      customers: result.recordset,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

//Update customer data by customerId
export async function UpdateCustomer(req, res){
  try{
    const customerId = req.query.customerId
    if(!customerId){
      res.status(400).send("Chưa truyền vào ID của khách hàng muốn xóa")
      return
    }
    const oldData = (await db(`Select FullName, PersonalId, Phone, Address, Type from Customer where CustomerId = ${customerId}`)).recordset[0]
    if(oldData){
      const newData = req.body
      if(newData.FullName && !/^[\p{L}\s]+$/u.test(newData.FullName)){
        res.status(400).send("Họ tên khách hàng chỉ bao gồm chữ cái, không được chứa chữ số và kí tự đặc biệt")
        return
      }
      if(newData.PersonalId){
        if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where PersonalId = '${newData.PersonalId}' and CustomerId != ${customerId}`)).recordset[0].Count) > 0){
          res.status(400).send("Số CCCD đã tồn tại trong hệ thống")
          return
        }
        if(!/^\d{12}$/.test(newData.PersonalId)){
          res.status(400).send("Số CCCD chỉ bao gồm chữ số và có độ dài 12 kí tự")
          return
        }
      }
      if(newData.Phone){
        if(!/^\d{10,11}$/.test(newData.Phone)){
          res.status(400).send("Số điện thoại của khách hàng chỉ chứa chữ số và có độ dài tối thiểu là 10 kí tự và tối đa 11 kí tự")
          return
        }
        if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where Phone = '${newData.Phone}' and CustomerId != ${customerId}`)).recordset[0].Count) > 0){
          res.status(400).send("Số điện thoại đã tồn tại trong hệ thống")
          return
        }
      }

      var newType = 0;
      if(newData.Type){
        if(newData.Type === 'VIP') newType = 1
        else if(newData.Type === 'Premium') newType = 2;
        else if(newData.Type === 'Normal') newType = 3;
        else{
          res.status(400).send("Loại khách hàng chỉ có 3 giá trị là VIP, Premium hoặc Normal")
          return
        }
      }

      const result = await db(`Update Customer set 
      FullName = N'${newData.FullName ? newData.FullName : oldData.FullName}', 
      PersonalId = '${
        newData.PersonalId ? newData.PersonalId : oldData.PersonalId
      }',
      Phone = '${newData.Phone ? newData.Phone : oldData.Phone}',
      Address = N'${newData.Address ? newData.Address : oldData.Address}',
      Type = ${newData.Type ? newType : oldData.Type}
      where CustomerId = ${customerId}
      Select * From Customer where CustomerId = ${customerId}
      `);
      res.send({
        message: "Cập nhật dữ liệu khách hàng thành công !",
        customers: result.recordset,
      });
    } else {
      res.status(400).send("Khách hàng không tồn tại trong hệ thống")
      return
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
