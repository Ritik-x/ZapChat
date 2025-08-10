import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { translateToGoodEnglish } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/translate", protectedRoute, translateToGoodEnglish);

export default aiRouter;
