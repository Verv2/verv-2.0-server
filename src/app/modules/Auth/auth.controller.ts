import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log("From controller:", req.body);
  const result = await AuthServices.loginUser(req.body);

  // const { refreshToken } = result;

  // res.cookie("refreshToken", refreshToken, {
  //   secure: false,
  //   httpOnly: true,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: {
      // accessToken: result.accessToken,
      // needPasswordChange: result.needPasswordChange,
    },
  });
});

export const AuthController = {
  loginUser,
  // refreshToken,
  // changePassword,
  // forgotPassword,
  // resetPassword,
};
