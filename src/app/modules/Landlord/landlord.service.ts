import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { IPaginationOptions } from "../../interfaces/pagination";
import { TImageFiles, TLandlordUser, TProperty } from "./landlord.interface";
import httpStatus from "http-status";
import { propertySearchableFields } from "./landlord.constant";

const addPropertyIntoDB = async (
  user: TLandlordUser,
  payload: TProperty,
  images: TImageFiles
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: user?.userId },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "User doesn't exist");
  }

  if (!existingUser.isProfileUpdated) {
    throw new ApiError(httpStatus.CONFLICT, "Profile is not updated");
  }

  const existingLandlord = await prisma.landlord.findUnique({
    where: { userId: user?.userId },
  });

  if (!existingLandlord) {
    throw new ApiError(httpStatus.CONFLICT, "Landlord doesn't exist");
  }

  const { propertyImages } = images;
  const arrImages = propertyImages.map((image) => image.path);

  const propertyData = {
    ...payload,
    email: user?.email,
    landlordId: existingLandlord.id,
    propertyImages: arrImages,
  };

  const result = await prisma.propertyListing.create({
    data: propertyData,
  });

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

export const LandlordService = {
  addPropertyIntoDB,
  getAllFromDB,
};
