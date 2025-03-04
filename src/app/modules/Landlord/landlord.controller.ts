import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { LandlordService } from "./landlord.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const addProperty = catchAsync(async (req: Request, res: Response) => {
  const result = await LandlordService.addPropertyIntoDB();

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
