import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { LandlordService } from "./landlord.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiErrors";
import { TImageFiles } from "./landlord.interface";

const addProperty = catchAsync(async (req: Request, res: Response) => {
  if (!req.files) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please upload an image");
  }

  const result = await LandlordService.addPropertyIntoDB(
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property is added successfully",
    data: {},
  });
});

export const LandlordController = {
  addProperty,
};
