export const config = {
  server: "localhost",
  port: 1433,
  database: "hotel_management",
  user: "sa",
  password: "Password123",
  options: {
    //encrypt: true, // Bật mã hóa
    trustServerCertificate: true, // Tin tưởng chứng chỉ máy chủ
    trustedConnection: true
  },
  
};