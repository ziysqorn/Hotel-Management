import sql from "mssql"
import db from "../db.js"



//Create customer data
export async function  CreateCustomer(req, res){
  try{
    const data = req.body;
    if(!data.FullName || !data.PersonalId || !data.Type){
      res.send("Không được để trống họ tên, CCCD và loại khách hàng")
      return
    }
    if(!/^[\p{L}\s]+$/u.test(data.FullName)){
      res.send("Họ tên khách hàng chỉ bao gồm chữ cái, không được chứa chữ số và kí tự đặc biệt")
      return
    }
    if(!/^\d{12}$/.test(data.PersonalId)){
      res.send("Số CCCD chỉ bao gồm chữ số và có độ dài 12 kí tự")
      return
    }
    if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where PersonalId = '${data.PersonalId}'`)).recordset[0].Count) > 0){
      res.send("Số CCCD đã tồn tại trong hệ thống")
      return
    }
    if(data.Phone){
      if(!/^\d{10,11}$/.test(data.Phone)){
        res.send("Số điện thoại của khách hàng chỉ chứa chữ số và có độ dài tối thiểu là 10 kí tự và tối đa 11 kí tự")
        return
      }
      if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where Phone = '${data.Phone}'`)).recordset[0].Count) > 0){
        res.send("Số điện thoại đã tồn tại trong hệ thống")
        return
      }
    }
    if(!/^[1-3]$/.test(data.Type)){
      res.send("Loại khách hàng chỉ chứa 1 chữ số có giá trị từ 1 đến 3")
      return
    }
    const result = await db(`INSERT INTO Customer (FullName,PersonalId,Phone,Address,Type) values 
    (N'${data.FullName}', 
    '${data.PersonalId}', 
    ${data.Phone ? `'${data.Phone}'` : null}, 
    ${data.Address ? `N'${data.Addess}'` : null}, 
    ${data.Type})
    Select * from Customer
    `)
    console.log(result)
    res.send({
      message: "Thêm dữ liệu khách hàng thành công !",
      customers: result.recordset
    })
  }
  catch(err){
    const countResult = (await db(`Select COUNT(*) as 'Count' from Customer`)).recordset[0].Count
    await db(`DBCC CHECKIDENT ('Customer', RESEED, ${countResult + 1})`)
    console.log(err)
    res.send(err)
  }
}


//Read all customer data
export async function ReadAllCustomer(req,res){
    try {
        const data = await db("SELECT * FROM Customer");
        res.send(data.recordset)
      } catch (err) {
        console.log(err);
        res.send(err)
    }
}


//Read customer data by customerId
export async function ReadCustomerById(req, res){
  try {
    const customerId = req.query.customerId
    if(!customerId){
      res.send("Chưa truyền vào ID của khách hàng muốn tìm")
      return
    }
    const result = await db(`SELECT * FROM Customer where CustomerId = ${customerId}`);
    res.send(result.recordset)
  } catch (err) {
    console.log(err);
    res.send(err)
  }
}


//Read customer data by personalId
export async function ReadCustomerByPersonalId(req, res){
  try{
    const personalId = req.query.personalId
    if(!personalId){
      res.send("Chưa truyền vào số CCCD của khách hàng muốn tìm")
      return
    }
    const result = await db(`SELECT * FROM Customer where PersonalId = '${personalId}'`)
    res.send(result.recordset)
  } catch (err){
    console.log(err)
    res.send(err)
  }
}


//Read customer data by phone number
export async function ReadCustomerByPhoneNumber(req, res){
  try{
    const phoneNumber = req.query.phoneNumber
    if(!phoneNumber){
      res.send("Chưa truyền vào số điện thoại của khách hàng muốn tìm")
      return
    }
    const result = await db(`SELECT * FROM Customer where Phone = '${phoneNumber}'`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}


//Read revenue from a customer
export async function ReadCustomerTotalSpent(req, res){
  try{
    const customerId = req.query.customerId
    if(!customerId){
      res.send("Chưa truyền vào ID của khách hàng muốn tìm")
      return
    }
    const result = await db(`SELECT SUM(TotalPrice) AS TotalSpent from Bill where CustomerId = ${customerId}`);
    res.send(result.recordset[0])
  } catch (err){
    console.log(err)
    res.send(err)
  }
}


//Read customer by name
export async function ReadCustomerByName(req, res){
  try{
    const customerName = req.query.customerName
    if(!customerName){
      res.send("Chưa truyền vào tên của khách hàng muốn tìm")
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
    const result = await db(`Select Customer.CustomerId, FullName, PersonalId, Phone, Type, RoomId, CheckInDate, ExpectedCHeckOutDate from Customer
    join OrderRoom on OrderRoom.StayCustomerId = Customer.CustomerId
    where GETDATE() between CheckInDate and ExpectedCHeckOutDate`)
    res.send(result.recordset)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}


//Delete customer data by customerId
export async function DeleteCustomer(req, res){
  try{
    const customerId = req.query.customerId
    if(!customerId){
      res.send("Chưa truyền vào ID của khách hàng muốn xóa")
      return
    }
    const countResult = (await db(`select COUNT(*) as 'Count' from OrderRoom where OrderRoom.CustomerId = ${customerId} or OrderRoom.StayCustomerId = ${customerId}
    select COUNT(*) as 'Count' from UseService where UseService.CustomerId = ${customerId}
    select COUNT(*) as 'Count' from Bill where Bill.CustomerId = ${customerId}
    select COUNT(*) as 'Count' from Customer where Customer.CustomerId = ${customerId}`)).recordsets
    var counter = 0
    for(let table of countResult) counter += parseInt(table[0].Count)
    if(counter > 1){
      res.send("Không thể xóa khách hàng vì hệ thống vẫn đang sử dụng dữ liệu của khách hàng này")
      return
    }
    else if(counter == 0){
      res.send("Dữ liệu khách hàng không tồn tại trong hệ thống !")
      return
    }
    const result = await db(`Delete from Customer where CustomerId = ${customerId} Select * from Customer`)
    console.log(result)
    res.send({
      message: "Xóa dữ liệu khách hàng thành công !",
      customers: result.recordset
    })
  } catch (err){
    console.log(err);
    res.send(err)
  }
}


//Update customer data by customerId
export async function UpdateCustomer(req, res){
  try{
    const customerId = req.query.customerId
    if(!customerId){
      res.send("Chưa truyền vào ID của khách hàng muốn xóa")
      return
    }
    const oldData = (await db(`Select FullName, PersonalId, Phone, Address, Type from Customer where CustomerId = ${customerId}`)).recordset[0]
    if(oldData){
      const newData = req.body
      if(newData.FullName && !/^[\p{L}\s]+$/u.test(newData.FullName)){
        res.send("Họ tên khách hàng chỉ bao gồm chữ cái, không được chứa chữ số và kí tự đặc biệt")
        return
      }
      if(newData.PersonalId){
        if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where PersonalId = '${newData.PersonalId}'`)).recordset[0].Count) > 0){
          res.send("Số CCCD đã tồn tại trong hệ thống")
          return
        }
        if(!/^\d{12}$/.test(newData.PersonalId)){
          res.send("Số CCCD chỉ bao gồm chữ số và có độ dài 12 kí tự")
          return
        }
      }
      if(newData.Phone){
        if(!/^\d{10,11}$/.test(newData.Phone)){
          res.send("Số điện thoại của khách hàng chỉ chứa chữ số và có độ dài tối thiểu là 10 kí tự và tối đa 11 kí tự")
          return
        }
        if(parseInt((await db(`Select COUNT(*) as 'Count' from Customer where Phone = '${newData.Phone}'`)).recordset[0].Count) > 0){
          res.send("Số điện thoại đã tồn tại trong hệ thống")
          return
        }
      }
      if(newData.Type && !/^[1-3]$/.test(data.Type)){
        res.send("Loại khách hàng chỉ chứa 1 chữ số có giá trị từ 1 đến 3")
        return
      }
      const result = await db(`Update Customer set 
      FullName = N'${newData.FullName ? newData.FullName : oldData.FullName}', 
      PersonalId = '${newData.PersonalId ? newData.PersonalId : oldData.PersonalId}',
      Phone = '${newData.Phone ? newData.Phone : oldData.Phone}',
      Address = N'${newData.Address ? newData.Address : oldData.Address}',
      Type = ${newData.Type ? newData.Type : oldData.Type}
      where CustomerId = ${customerId}
      Select * From Customer where CustomerId = ${customerId}
      `)
      res.send({
        message: "Cập nhật dữ liệu khách hàng thành công !",
        customers: result.recordset
      })
    } else {
      res.send("Khách hàng không tồn tại trong hệ thống")
      return
    }
  } catch (err){
    console.log(err)
    res.send(err)
  }
}
  