import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// Public
router.post("/login", login);

// Protected
router.get("/me", protect, me);

// Admin only
router.post(
  "/register",
  protect,
 authorize("ADMIN"),
  register
);

export default router;