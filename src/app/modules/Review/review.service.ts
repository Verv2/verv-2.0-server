import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { TReview } from "./review.interface";
import httpStatus from "http-status";

const addReviewIntoDB = async (userId: string, payload: TReview) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  if (!existingUser.isProfileUpdated) {
    throw new ApiError(httpStatus.NOT_FOUND, "User profile doesn't exist");
  }

  const reviewData = {
    reviewerId: userId,
    ...payload,
  };

  const result = await prisma.review.create({
    data: reviewData,
  });
  return result;
};

export const ReviewService = {
  addReviewIntoDB,
};
