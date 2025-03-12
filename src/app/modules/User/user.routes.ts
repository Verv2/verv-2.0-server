import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { multerUpload } from "../../../config/multer.config";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.LANDLORD,
    UserRole.TENANT
  ),
  userController.getAllUsers
);

router.get(
  "/:id",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.LANDLORD,
    UserRole.TENANT
  ),
  userController.getUserById
);

router.post(
  "/register-user",
  validateRequest(userValidation.userValidationSchema),
  userController.registerUser
);

router.post(
  "/create-profile",
  auth(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.LANDLORD,
    UserRole.TENANT
  ),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidation.userProfileValidationSchema),
  userController.createUserProfile
);

export const UserRoutes = router;
