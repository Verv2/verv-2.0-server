import express, { NextFunction, Request, Response } from "express";
import { LandlordController } from "./landlord.controller";
import { multerUpload } from "../../../config/multer.config";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/all-property",
  auth(
    UserRole.TENANT,
    UserRole.LANDLORD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN
  ),
  LandlordController.getAllFromDB
);

router.get(
  "/all-landlord",
  auth(
    UserRole.TENANT,
    UserRole.LANDLORD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN
  ),
  LandlordController.getAllLandlord
);

router.get("/:id", LandlordController.getLandlordById);

router.post(
  "/create-landlord-profile",
  auth(UserRole.LANDLORD, UserRole.USER),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  LandlordController.createLandlordProfile
);

router.post(
  "/add-property",
  auth(UserRole.LANDLORD),
  multerUpload.fields([{ name: "propertyImages" }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  LandlordController.addProperty
);

export const LandlordRoutes = router;
