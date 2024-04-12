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


