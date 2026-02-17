import express from "express";
import { inviteUser } from "../controllers/usecontroller";
import { verifyToken } from "../middleware/verifyToken";
import { requireAdmin } from "../middlewares/require.admin";

const router = express.Router();

router.post("/invite", verifyToken, requireAdmin, inviteUser);

export default router;
