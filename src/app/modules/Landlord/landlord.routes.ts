import express from "express";
import { LandlordController } from "./landlord.controller";
import { multerUpload } from "../../../config/multer.config";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/add-property",
  auth(UserRole.LANDLORD),
  multerUpload.fields([{ name: "propertyImages" }]),
  LandlordController.addProperty
);

export const LandlordRoutes = router;
