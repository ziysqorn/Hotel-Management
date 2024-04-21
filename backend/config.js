export const config = {
  server: "localhost\\SQLEXPRESS",
  port: 1433,
  database: "hotel_management",
   user: "sa",
   password: "Huda2206",
  options: {
    //encrypt: true, // Bật mã hóa
    trustServerCertificate: true, // Tin tưởng chứng chỉ máy chủ
    trustedConnection: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};