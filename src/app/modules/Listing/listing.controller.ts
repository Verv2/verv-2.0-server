import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { ListingService } from "./listing.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { listingFilterableFields } from "./listing.constant";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, listingFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await ListingService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const ListingController = {
  getAllFromDB,
};
