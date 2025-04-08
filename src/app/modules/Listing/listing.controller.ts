import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { ListingService } from "./listing.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { listingFilterableFields } from "./listing.constant";
import ApiError from "../../errors/ApiErrors";
import { TImageFiles } from "../Landlord/landlord.interface";

const createTemporaryListing = catchAsync(
  async (req: Request & { user?: { userId: string } }, res: Response) => {
    if (!req.files) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Please upload an image");
    }

    const data = req.body;
    const userId = req.user?.userId;
    const images = req.files;

    const result = await ListingService.createTemporaryListingIntoDb(
      data,
      userId as string,
      images as TImageFiles
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Temporary Listings created successfully",
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, listingFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await ListingService.getListingAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listings retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getListingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ListingService.getListingByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listing retrieval successfully",
    data: result,
  });
});

const deleteListing = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ListingService.deleteListingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Listing deleted successfully",
    data: result,
  });
});

export const ListingController = {
  createTemporaryListing,
  getAllFromDB,
  getListingById,
  deleteListing,
};
