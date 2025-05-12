import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TenantService } from "./tenant.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

const createTenantProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await TenantService.createTenantProfileIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant Profile is created successfully!",
    data: result,
  });
});

const rentNowTenantInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await TenantService.createRentNowTenantInfo(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Referenced tenants has been added",
    data: result,
  });
});

export const TenantController = {
  createTenantProfile,
  rentNowTenantInfo,
};
