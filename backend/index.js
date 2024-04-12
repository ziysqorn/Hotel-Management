import express from "express";
import cors from "cors";
import roomRoute from "./routes/room.js";
import customerRoute from "./routes/customer.js";

const app = express();

// Khi server khởi động, kết nối tới SQL Server

app.use(cors());

app.use(express.json());
app.use("/api/room", roomRoute);
app.use("/api/customer", customerRoute);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
