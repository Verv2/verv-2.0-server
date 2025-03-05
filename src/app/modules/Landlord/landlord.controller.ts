import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { LandlordService } from "./landlord.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiErrors";
import { TImageFiles } from "./landlord.interface";
import { IAuthUser } from "../../interfaces/common";

const addProperty = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    if (!req.files) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Please upload an image");
    }

    const images = req.files;
    const payload = {
      landlordId: req.user?.userId,
      email: req.user?.email,
      ...req.body,
    };

    const result = await LandlordService.addPropertyIntoDB(
      payload,
      images as TImageFiles
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Property is added successfully",
      data: result,
    });
  }
);

export const LandlordController = {
  addProperty,
};
