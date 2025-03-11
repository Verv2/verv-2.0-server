import express from "express";
import { ListingController } from "./listing.controller";

const router = express.Router();

router.get("/", ListingController.getAllFromDB);

router.get("/:id", ListingController.getListingById);

export const ListingRoutes = router;
