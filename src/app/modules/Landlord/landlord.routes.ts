import express from "express";
import { LandlordController } from "./landlord.controller";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

router.post(
  "/add-property",
  multerUpload.fields([{ name: "propertyImages" }]),
  LandlordController.addProperty
);

export const LandlordRoutes = router;
