import express from "express";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/add-review", ReviewController.addReview);

export const ReviewRoutes = router;
