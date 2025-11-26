import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
// import { upload } from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login",  validateSchema(loginSchema), login);
router.post("/logout",  verifyToken, logout);

export default router;