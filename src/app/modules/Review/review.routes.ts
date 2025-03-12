import express from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/add-review",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.LANDLORD,
    UserRole.TENANT
  ),
  ReviewController.addReview
);

export const ReviewRoutes = router;
