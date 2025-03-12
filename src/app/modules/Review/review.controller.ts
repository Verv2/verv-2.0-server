import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const review = req.body;

  const result = await ReviewService.addReviewIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully!",
    data: {},
  });
});

export const ReviewController = {
  addReview,
};
