import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

// request and response are handled by controller
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await userService.registerUserIntoDB(user);

  const userWithEmptyPassword = { ...result, password: "" };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully!",
    data: userWithEmptyPassword,
  });
});

export const userController = {
  registerUser,
};
