import express from "express";
import { ListingController } from "./listing.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", ListingController.getAllFromDB);

router.get("/:id", ListingController.getListingById);

router.delete(
  "/:id",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  ListingController.deleteListing
);

export const ListingRoutes = router;
