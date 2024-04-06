import express from "express";

import roomRoutes from "./routes/room.js";
import employeeRoutes from "./routes/employee.js";

const app = express();

// Khi server khởi động, kết nối tới SQL Server

app.use(express.json());
app.use("/api/room", roomRoutes);
app.use("/api/employee", employeeRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
