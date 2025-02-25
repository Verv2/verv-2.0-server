import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

// request and response are handled by controller
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await userService.createAdmin(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
});

export const userController = {
  registerUser,
};
