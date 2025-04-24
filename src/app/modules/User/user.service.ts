import { Request } from "express";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { TUser } from "./user.interface";
import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";
import { User } from "@prisma/client";

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
    languages: req.body.languages,
    profilePhoto: req.file?.path || "",
  };

  // console.log("From User Service", userProfileData);

  const result = await prisma.$transaction(async (tx) => {
    let createdData;

    // if (req.user?.role === "TENANT") {
    //   const existingTenant = await prisma.tenant.findUnique({
    //     where: { userId: req.user?.userId },
    //   });

    //   if (existingTenant) {
    //     throw new ApiError(
    //       httpStatus.CONFLICT,
    //       "Tenant profile has already created"
    //     );
    //   }

    //   createdData = await tx.tenant.create({
    //     data: userProfileData,
    //   });
    // }

    if (req.user?.role === "LANDLORD") {
      const existingLandlord = await prisma.landlord.findUnique({
        where: { userId: req.user?.userId },
      });

      if (existingLandlord) {
        throw new ApiError(
          httpStatus.CONFLICT,
          "Landlord profile has already created"
        );
      }

      createdData = await tx.landlord.create({
        data: userProfileData,
      });

      // await tx.user.update({
      //   where: { id: req.user?.userId },
      //   data: { profilePhoto: req.file?.path || "" },
      // });
    }

    if (req.user?.role === "ADMIN") {
      const existingAdmin = await prisma.admin.findUnique({
        where: { userId: req.user?.userId },
      });

      if (existingAdmin) {
        throw new ApiError(
          httpStatus.CONFLICT,
          "Admin profile has already created"
        );
      }

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
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          profilePhoto: req.file?.path || "",
        },
      });
    }

    return createdData;
  });

  console.log(result);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    include: {
      landlord: {
        include: {
          propertyListing: true,
        },
      },
      tenant: true,
      review: true,
    },
  });

  return result;
};

const getUserByIdFromDB = async (id: string): Promise<User | null> => {
  const result = prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      landlord: {
        include: {
          propertyListing: true,
        },
      },
      tenant: true,
      review: true,
    },
  });

  return result;
};

const getMeFromDB = async (req: Request & { user?: IAuthUser }) => {
  console.log("getMe function called");
  console.log(req.user?.userId);

  const user = await prisma.user.findUnique({
    where: { id: req.user?.userId },
  });

  const returnedUser = {
    id: user?.id,
    email: user?.email,
    role: user?.role,
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phoneNumber,
    profilePhoto: user?.profilePhoto,
    isProfileUpdated: user?.isProfileUpdated,
    status: user?.status,
  };

  return returnedUser;
};

export const userService = {
  registerUserIntoDB,
  createUserProfileIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  getMeFromDB,
};
