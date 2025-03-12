import express from "express";

import { UserRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routers";
import { LandlordRoutes } from "../modules/Landlord/landlord.routes";
import { ListingRoutes } from "../modules/Listing/listing.routes";
import { ReviewRoutes } from "../modules/Review/review.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/landlord",
    route: LandlordRoutes,
  },
  {
    path: "/listings",
    route: ListingRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
