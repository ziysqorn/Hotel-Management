import express from "express";
import cors from "cors";
import roomRoute from "./routes/room.js";
import employRoute from "./routes/employee.js";
import customerRoute from "./routes/customer.js";
import serviceRoute from "./routes/service.js";
const app = express();

// Khi server khởi động, kết nối tới SQL Server

app.use(cors());

app.use(express.json());

app.use("/api/room", roomRoute);
app.use("/api/employee", employRoute);
app.use("/api/customer", customerRoute);
app.use("/api/service", serviceRoute);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
