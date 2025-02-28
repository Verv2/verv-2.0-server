import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

router.post(
  "/register-user",
  validateRequest(userValidation.userValidationSchema),
  userController.registerUser
);

router.post(
  "/create-profile",
  multerUpload.single("image"),
  // validateRequest(userValidation.userValidationSchema),
  userController.createUserProfile
);

export const UserRoutes = router;

// mutlterUpload.fields
