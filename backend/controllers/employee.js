import db from "../db.js";

export const getAll = async (req, res) => {
  try {
    const data = await db(`SELECT * FROM Employee`);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

export const getAllWithQuery = async (req, res) => {
  try {
    let queryString = `SELECT * FROM Employee`;
    let tempString = `SELECT * FROM Employee`;
    if (req.query.employeeid) {
      queryString += ` WHERE EmployeeId = ${req.query.employeeid}`;
    }

    console.log("final query: ", tempString);
    const data = await db(queryString);
    res.json({ data, query: req.query.employeeid });
  } catch (e) {
    console.log(e);
  }
};
