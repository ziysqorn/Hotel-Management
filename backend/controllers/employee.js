import db from "../db.js";

//get with query
export const getWithQuery = async (req, res) =>{
    let {employid, rolesid} = req.query
    let FinalQuery = 'SELECT * FROM Employee WHERE NOT(Employee.EmployeeId IS NULL)'

    if (employid) {
        FinalQuery += ` AND EmployeeId = ${employid}`;
    }
    if (rolesid) {
        FinalQuery += ` AND RolesId = ${rolesid}`;
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

export const get = async (req, res) => {
    try
    {
        const data = await db("SELECT * FROM Employee");
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }
    
};
//Thêm nhân viên
export const AddEmployee = async (req, res) => {
    let {item} = req.body;

    let FinalQuery = `INSERT INTO Employee
    ( FullName, PersonalId, Phone, BirthDay, FristDay, Address, position, RolesId)
    VALUES
        (
            
            '${item.FullName}',
            '${item.PersonalId}',
            '${item.Phone}',
            '${item.BirthDay}',
            '${item.FristDay}',
            '${item.Address}',
            '${item.Position}',
            '${item.RolesId}'
        );
        SELECT * FROM Employee WHERE PersonalId = '${item.PersonalId}' `;
    try
    {
        const data = await db(FinalQuery);
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }
}

// chỉnh sửa thông tin
export const EditEmployee = async (req, res) => {
    let {item} = req.body;
    let FinalQuery = `UPDATE Employee
    SET Phone = '${item.Phone}',
        Address = '${item.Address}',
        Position = '${item.Position}' 
    WHERE EmployeeId = '${item.EmployeeId}'`;

    console.table(FinalQuery);
    try
    {
        const data = await db(FinalQuery);
        res.json(`Update Employee ${item.EmployeeId} success`);
    }
    catch (err) {
        console.log(err);
    }
}

export const DeleteEmployee = async (req, res) => {
    let {item} = req.body;
    let FinalQuery = ` DELETE FROM Employee WhERE EmployeeId = ${item.EmployeeId} `;
    console.table(FinalQuery);
    try
    {
        const data = await db(FinalQuery);
        res.json(`Delete Employee success`);
    }
    catch (err) {
        console.log(err);
    }
}