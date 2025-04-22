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

const createUserProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserProfileIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile is created successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieval successful",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getUserByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieval successful",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getMeFromDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Data retrieval successful",
    data: result,
  });
});

export const userController = {
  registerUser,
  createUserProfile,
  getAllUsers,
  getUserById,
  getMe,
};
