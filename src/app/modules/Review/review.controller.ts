import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";
import { IAuthUser } from "../../interfaces/common";

const addReview = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const userId = req.user?.userId as string;

    const result = await ReviewService.addReviewIntoDB(userId, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review is added successfully!",
      data: result,
    });
  }
);

export const ReviewController = {
  addReview,
};
