import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { setServers } from "dns";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoute.js";

// craete express app and httyp

const app = express();

const server = http.createServer(app);
// middleware setup

app.use(express.json({ limit: "5mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("server  is live"));

app.use("/api/auth", userRouter);

await connectDB();
const PORT = process.env.PORT || 5005;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
