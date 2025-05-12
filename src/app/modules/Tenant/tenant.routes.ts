import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../../config/multer.config";
import { TenantController } from "./tenant.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-tenant-profile",
  auth(UserRole.TENANT),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  TenantController.createTenantProfile
);

router.post(
  "/rent-now-tenant-info",
  auth(UserRole.TENANT),
  TenantController.rentNowTenantInfo
);

export const TenantRoutes = router;
