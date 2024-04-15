import sql from "mssql";
/**
 * @type {sql.Config}
 */
import { config } from "./config.js"; 
// const config = {
//   server: "localhost\\SQLEXPRESS",
//   port: 1433,
//   database: "hotel_management",
//    user: "sa",
//    password: "Huda2206",
//   options: {
//     //encrypt: true, // Bật mã hóa
//     trustServerCertificate: true, // Tin tưởng chứng chỉ máy chủ
//     trustedConnection: true
//   },
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   }
// };

async function db(queryString, parameters = []) {
  try {
    // Kết nối đến cơ sở dữ liệu
    await sql.connect(config);
    // Thực thi truy vấn
    const result = await sql.query(queryString, ...parameters);

    // Đóng kết nối sau khi thực thi truy vấn
    await sql.close();

    // Trả về kết quả
    return result;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

export default db;
