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
