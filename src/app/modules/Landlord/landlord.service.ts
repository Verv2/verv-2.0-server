import { Landlord, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { IPaginationOptions } from "../../interfaces/pagination";
import { TImageFiles, TLandlordUser, TProperty } from "./landlord.interface";
import httpStatus from "http-status";
import { propertySearchableFields } from "./landlord.constant";
import { IAuthUser } from "../../interfaces/common";
import { Request } from "express";

const createLandlordProfileIntoDB = async (
  req: Request & { user?: IAuthUser }
) => {
  console.log("createLandlordProfileIntoDB called");
  if (!req.user) {
    throw new Error("User information is missing.");
  }

  console.log(req.body);

  const landlordProfileData = {
    userId: req.user.userId,
    email: req.user.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    languages: req.body.languages,
    profilePhoto: req.file?.path || null,
  };

  const result = await prisma.$transaction(async (tx) => {
    const landlord = await tx.landlord.create({
      data: landlordProfileData,
    });

    if (landlord) {
      await tx.user.update({
        where: { id: req.user?.userId },
        data: {
          isProfileUpdated: true,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          profilePhoto: req.file?.path,
          role: "LANDLORD",
        },
      });
    }

    return landlord;
  });

  return result;
};

const addPropertyIntoDB = async (
  user: TLandlordUser,
  payload: TProperty,
  images: TImageFiles
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: user?.userId },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  if (!existingUser.isProfileUpdated) {
    throw new ApiError(httpStatus.CONFLICT, "Profile is not updated");
  }

  const existingLandlord = await prisma.landlord.findUnique({
    where: { userId: user?.userId },
  });

  if (!existingLandlord) {
    throw new ApiError(httpStatus.NOT_FOUND, "Landlord doesn't exist");
  }

  const { propertyImages } = images;
  const arrImages = propertyImages.map((image) => image.path);

  const propertyData = {
    ...payload,
    email: user?.email,
    landlordId: existingLandlord.id,
    propertyImages: arrImages,
  };

  // const result = await prisma.propertyListing.create({
  //   data: propertyData,
  // });
  const result = { test: "test" };

  return result;
};

const getAllFromDB = async (filters: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PropertyListingWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: propertySearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PropertyListingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.propertyListing.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  const total = await prisma.propertyListing.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAllLandlordFromDB = async () => {
  console.log("getAllLandlordFromDB called");
  const result = await prisma.landlord.findMany({
    include: { propertyListing: true },
  });

  return result;
};

const getLandlordByIdFromDB = async (
  userId: string
): Promise<Landlord | null> => {
  const result = await prisma.landlord.findUnique({
    where: {
      userId: userId,
    },
    include: {
      propertyListing: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Landlord not found");
  }

  return result;
};

export const LandlordService = {
  createLandlordProfileIntoDB,
  addPropertyIntoDB,
  getAllFromDB,
  getAllLandlordFromDB,
  getLandlordByIdFromDB,
};
