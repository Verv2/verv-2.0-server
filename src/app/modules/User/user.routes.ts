import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/register-user", userController.registerUser);

export const UserRoutes = router;
