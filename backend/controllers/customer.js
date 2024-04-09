import sql from "mssql"
import db from "../db.js"



//Create customer data
export async function  CreateCustomer(req, res){
  try{
    const data = req.body;
    const result = await db(`INSERT INTO Customer (FullName,PersonalId,Phone,Address,Type) values 
    (N'${data.FullName}', 
    '${data.PersonalId}', 
    '${data.Phone}', 
    N'${data.Address}', 
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
    console.log(err)
    res.send(err.originalError.info.message)
  }
}


//Read all customer data
export async function ReadAllCustomer(req,res){
    try {
        const data = await db("SELECT * FROM Customer");
        res.send(data.recordset)
      } catch (err) {
        console.log(err);
        res.send(err.originalError.info.message)
    }
}


//Delete customer data by customerId
export async function DeleteCustomer(req, res){
  try{
    const customerId = req.query.customerId
    const result = await db(`Delete from Customer where CustomerId = ${customerId} DBCC CHECKIDENT ('Customer', RESEED, 1) Select * from Customer`, [customerId])
    console.log(result)
    res.send({
      message: "Xóa dữ liệu khách hàng thành công !",
      customers: result.recordset
    })
  } catch (err){
    console.log(err);
    res.send(err.originalError.info.message)
  }
}
  