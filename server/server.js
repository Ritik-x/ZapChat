import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { setServers } from "dns";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import aiRouter from "./routes/aiRoutes.js";
// craete express app and httyp

const app = express();

const server = http.createServer(app);
//initialize socket.io server

export const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend
    methods: ["GET", "POST"],
  },
});

//store online users

export const userSocketMap = {}; //userid :socketid

// socketio connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("A user connected:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit online users to all clients
  io.emit("getonlineusers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getonlineusers", Object.keys(userSocketMap));
  });
});
// middleware setup

app.use(express.json({ limit: "5mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("server  is live"));

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/ai", aiRouter);

await connectDB();
const PORT = process.env.PORT || 5005;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
