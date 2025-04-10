import express, { NextFunction, Request, Response } from "express";
import { ListingController } from "./listing.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

router.get("/", ListingController.getAllFromDB);

router.get(
  "/get-temporary-listing",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  ListingController.getTemporaryListing
);

router.get("/:id", ListingController.getListingById);

router.post(
  "/create-temporary-listing",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  multerUpload.fields([{ name: "propertyImages" }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ListingController.createTemporaryListing
);

router.post(
  "/create-listing",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  ListingController.createListing
);

router.delete(
  "/:id",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  ListingController.deleteListing
);

export const ListingRoutes = router;
