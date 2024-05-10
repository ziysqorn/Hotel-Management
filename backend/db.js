import sql from "mssql";
import { config } from "./config.js";

let pool; // Biến để lưu trữ pool kết nối

// Hàm để khởi tạo pool kết nối
async function initialize() {
  try {
    pool = await sql.connect(config);
    console.log("Database connected.");
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
}

// Hàm để đóng pool kết nối
async function close() {
  try {
    await pool.close();
    console.log("Database connection closed.");
  } catch (err) {
    console.error("Error closing database connection:", err);
    throw err;
  }
}

// Hàm để thực hiện truy vấn
async function db(queryString, parameters = []) {
  try {
    // Kiểm tra xem pool kết nối đã được khởi tạo chưa
    if (!pool) {
      await initialize();
    }

    console.log(`Execute query ${queryString}`);

    // Thực thi truy vấn
    const result = await pool.request().query(queryString, ...parameters);

    // Trả về kết quả
    return result;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

export default db;
