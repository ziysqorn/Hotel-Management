import db from "../db.js";

//get with query
export const getWithQuery = async (req, res) =>{
    let {employid, rolesid, fullname, position} = req.query
    let FinalQuery = 'SELECT * FROM Employee WHERE NOT(Employee.EmployeeId IS NULL)'

    if (employid) {
        FinalQuery += ` AND EmployeeId = ${employid}`;
    }
    if (rolesid) {
        FinalQuery += ` AND RolesId = ${rolesid}`;
    }
    if (fullname) {
        FinalQuery += ` AND Employee.FullName LIKE '%${fullname}%'`;
    }
    if (position) {
        FinalQuery += ` AND Employee.position LIKE '%${position}%'`;
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

//xoá nhân viên
export const DeleteEmployee = async (req, res) => {
    let {item} = req.body;
    let FinalQuery = ` DELETE FROM Employee WHERE EmployeeId = ${item.EmployeeId} `;
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
/* ------ USERS ------ */
//tạo tk user
export const CreateUser = async (req, res) => {
    let {item}  =req.body;
    let FinalQuery = ` EXEC CreateUserForEmployee @EmployeeId = ${item.EmployeeId} ;
                    SELECT * FROM Users WHERE EmployeeId = ${item.EmployeeId}`;
    console.table(FinalQuery);
    try
    {
        const data = await db(FinalQuery);
        res.json(`Create user for employee ${item.EmployeeId} success`);
    }
    catch (err) {
        console.log(err);
    }
}

//Update User
export const UpdateUser = async (req, res) => {
    let {item} = await db(FinalQuery);
    let FinalQuery = `UPDATE Users 
                    SET Password = '${item.Password}' 
                    WHERE UserId = '${item.UserId}'`;
    console.table(FinalQuery);
    try
    {
        const data = await db(FinalQuery);
        res.json(`Update user ${item.EmployeeId} success`);
    }
    catch (err) {
        console.log(err);
    }
}

//delete user
export const DeleteUser = async (req, res) => {
    let {item} = await db(FinalQuery);
    let FinalQuery = `DELETE FROM Users WHERE UserId = ${item.UserId}`;
    console.table(FinalQuery);
    try
    {
        const data = await db(FinalQuery);
        res.json(`Delete user ${item.UserId} success`);
    }
    catch (err) {
        console.log(err);
    }
}

export const getUser = async (req, res) => {
    try
    {
        const data = await db(`SELECT 
                                e.FullName, 
                                e.Phone, 
                                e.PersonalId, 
                                e.BirthDay, 
                                e.FristDay, 
                                e.Address, 
                                e.position, 
                                e.RolesId, 
                                u.EmployeeId, 
                                u.Password, 
                                u.UserId
                            FROM Employee e
                            INNER JOIN Users u ON e.EmployeeId = u.EmployeeId`);
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }
    
};

// Get user with query
export const getUserQuery = async (req, res) =>{
    let {userid, userRolesid, userFullname, userPosition} = req.query;
    let FinalQuery = `SELECT 
                        e.FullName, 
                        e.Phone, 
                        e.PersonalId, 
                        e.BirthDay, 
                        e.FristDay, 
                        e.Address, 
                        e.position, 
                        e.RolesId, 
                        u.EmployeeId, 
                        u.Password, 
                        u.UserId
                    FROM Employee e
                    INNER JOIN Users u ON e.EmployeeId = u.EmployeeId 
                    WHERE NOT(u.UserId IS NULL)`

    if (userid) {
        FinalQuery += ` AND u.UserId = ${userid}`;
    }
    if (userRolesid) {
        FinalQuery += ` AND e.RolesId = ${userRolesid}`;
    }
    if (userFullname) {
        FinalQuery += ` AND e.FullName LIKE '%${userFullname}%'`;
    }
    if (userPosition) {
        FinalQuery += ` AND e.position LIKE '%${userPosition}%'`;
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

// login user backend
export const LoginUser = async (req, res) => {
    let {item} = req.body;
    let FinalQuery = `SELECT 
                        e.FullName, 
                        e.Phone, 
                        e.PersonalId, 
                        e.BirthDay, 
                        e.FristDay, 
                        e.Address, 
                        e.position, 
                        e.RolesId, 
                        u.EmployeeId, 
                        u.Password, 
                        u.UserId
                    FROM Employee e
                    INNER JOIN Users u ON e.EmployeeId = u.EmployeeId 
                    WHERE e.Phone = '${item.Phone}' AND u.Password = '${item.Password}'`;
    try {
        const data = await db(FinalQuery);
        
        res.json(data);
      } catch (err) {
        console.log(err);
      }
}