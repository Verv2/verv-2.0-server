import express from "express";
import { PaymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/stripe-payment-intent",
  //   auth(
  //     UserRole.SUPER_ADMIN,
  //     UserRole.ADMIN,
  //     UserRole.LANDLORD,
  //     UserRole.TENANT
  //   ),
  PaymentController.stripePayment
);

export const PaymentRoutes = router;
