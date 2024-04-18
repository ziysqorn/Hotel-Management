import sql from "mssql";

const config = {
  server: "localhost",
  port: 1433,
  database: "hotel_management",
  user: "sa",
  password: "Sigma1207",
  options: {
    encrypt: true, // Bật mã hóa
    trustServerCertificate: true, // Tin tưởng chứng chỉ máy chủ
  },
};

// test ignore stuff
async function db(queryString, parameters = []) {
  try {
    // Kết nối đến cơ sở dữ liệu
    await sql.connect(config);
    console.log(`Execute query ${queryString}`);

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
