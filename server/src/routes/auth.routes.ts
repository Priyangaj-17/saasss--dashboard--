import { Router } from "express";
import { signup, loginUser } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", loginUser);

export default router;
