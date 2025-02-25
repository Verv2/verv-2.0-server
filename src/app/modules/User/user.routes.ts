import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/register-user",
  validateRequest(userValidation.userValidationSchema),
  userController.registerUser
);

export const UserRoutes = router;
