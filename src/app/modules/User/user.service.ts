import { Request } from "express";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { TUser } from "./user.interface";
import * as bcrypt from "bcrypt";
import httpStatus from "http-status";

const registerUserIntoDB = async (payload: TUser) => {
  // check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists");
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const userData = {
    email: payload.email,
    password: hashedPassword,
    role: payload.role,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};

const createUserProfileIntoDB = async (req: Request) => {
  console.log(req.body);
  console.log("User Profile");
};

export const userService = {
  registerUserIntoDB,
  createUserProfileIntoDB,
};
