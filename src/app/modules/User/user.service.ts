import { Request } from "express";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { TUser } from "./user.interface";
import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";

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

const createUserProfileIntoDB = async (req: Request & { user?: IAuthUser }) => {
  if (!req.user) {
    throw new Error("User information is missing.");
  }

  const userProfileData = {
    userId: req.user.userId,
    email: req.user.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    profilePhoto: req.file?.path || "",
  };

  console.log(userProfileData);

  const result = await prisma.$transaction(async (tx) => {
    let createdData;

    if (req.user?.role === "TENANT") {
      createdData = await tx.tenant.create({
        data: userProfileData,
      });
    }

    if (req.user?.role === "LANDLORD") {
      createdData = await tx.landlord.create({
        data: userProfileData,
      });
    }

    if (req.user?.role === "ADMIN") {
      createdData = await tx.admin.create({
        data: userProfileData,
      });
    }

    if (req.file?.path) {
      await tx.user.update({
        where: {
          email: req.user?.email,
        },
        data: {
          isProfileUpdated: true,
        },
      });
    }

    return createdData;
  });

  console.log(result);

  return result;
};

export const userService = {
  registerUserIntoDB,
  createUserProfileIntoDB,
};
