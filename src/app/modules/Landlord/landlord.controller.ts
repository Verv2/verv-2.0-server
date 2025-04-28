import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { LandlordService } from "./landlord.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiErrors";
import { TImageFiles, TLandlordUser } from "./landlord.interface";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";
import { propertyFilterableFields } from "./landlord.constant";

const createLandlordProfile = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LandlordService.createLandlordProfileIntoDB(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Landlord Profile is created successfully!",
      data: result,
    });
  }
);

const addProperty = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    if (!req.files) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Please upload an image");
    }

    const user = req.user;
    const images = req.files;

    const result = await LandlordService.addPropertyIntoDB(
      user as TLandlordUser,
      req.body,
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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, propertyFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await LandlordService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAllLandlord = catchAsync(async (req: Request, res: Response) => {
  const result = await LandlordService.getAllLandlordFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Landlords retrieval successfully",
    data: result,
  });
});

const getLandlordById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LandlordService.getLandlordByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Landlord retrieval successfully",
    data: result,
  });
});

export const LandlordController = {
  createLandlordProfile,
  addProperty,
  getAllFromDB,
  getAllLandlord,
  getLandlordById,
};
