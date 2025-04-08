import { Prisma, PropertyListing } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { listingSearchableFields } from "./listing.constant";
import { TImageFiles } from "../Landlord/landlord.interface";

const createTemporaryListingIntoDb = async (
  payload: any,
  userId: string,
  images: TImageFiles
) => {
  const existingTemporary = await prisma.temporaryProperty.findUnique({
    where: { userId },
  });

  const { propertyImages } = images;
  const arrImages = propertyImages.map((image) => image.path);

  console.log(propertyImages);

  const mergedData = {
    ...(typeof existingTemporary?.data === "object" &&
    existingTemporary?.data !== null
      ? existingTemporary.data
      : {}),
    ...payload,
    propertyImages: arrImages,
  };

  console.log(mergedData);

  const result = await prisma.temporaryProperty.upsert({
    where: { userId },
    update: {
      data: mergedData,
      step: payload.step,
    },
    create: {
      userId,
      data: mergedData,
      step: payload.step,
    },
  });

  return result;
};

const getListingAllFromDB = async (
  filters: any,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PropertyListingWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: listingSearchableFields.map((field) => ({
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
    include: { landlord: true },
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

const getListingByIdFromDB = async (
  id: string
): Promise<PropertyListing | null> => {
  const result = await prisma.propertyListing.findUnique({
    where: {
      id,
    },
    include: {
      landlord: true,
    },
  });
  return result;
};

const deleteListingFromDB = async (id: string): Promise<PropertyListing> => {
  const result = await prisma.propertyListing.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ListingService = {
  getListingAllFromDB,
  getListingByIdFromDB,
  deleteListingFromDB,
  createTemporaryListingIntoDb,
};
