import express from "express";
import { LandlordController } from "./landlord.controller";

const router = express.Router();

router.post("/add-property", LandlordController.addProperty);

export const LandlordRoutes = router;
