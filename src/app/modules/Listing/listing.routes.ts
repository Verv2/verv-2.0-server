import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ListingController } from "./listing.controller";

const router = express.Router();

router.get(
  "/all-listings",
  auth(UserRole.TENANT, UserRole.LANDLORD, UserRole.ADMIN),
  ListingController.getAllFromDB
);

export const ListingRoutes = router;
