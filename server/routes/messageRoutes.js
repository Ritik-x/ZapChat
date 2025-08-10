import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUserForsidebar,
  markMessageSeen,
  sendMessage,
} from "../controllers/messageController.js";

// import { protectedRoute } from "../middleware/auth.js"

const messageRouter = express.Router();
messageRouter.get("/users", protectedRoute, getUserForsidebar);
messageRouter.get("/:id", protectedRoute, getMessages);

messageRouter.put("/mark/:id", protectedRoute, markMessageSeen);
messageRouter.post("/:id", protectedRoute, sendMessage);
export default messageRouter;
