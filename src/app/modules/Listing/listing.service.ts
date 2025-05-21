import { Prisma, PropertyListing } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { booleanFields, listingSearchableFields } from "./listing.constant";
import { TImageFiles } from "../Landlord/landlord.interface";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";

const createTemporaryListingIntoDb = async (
  payload: any,
  userId: string,
  images: TImageFiles
) => {
  const existingTemporary = await prisma.temporaryProperty.findUnique({
    where: { userId },
  });

  const { propertyImages } = images;
  let arrImages: string[] = [];
  if (propertyImages) {
    arrImages = propertyImages.map((image) => image.path);
  }

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

const createListingIntoDb = async (payload: IListing, userId: string) => {
  const existingLandlord = await prisma.landlord.findUnique({
    where: { userId },
  });
  if (!existingLandlord) {
    throw new ApiError(httpStatus.NOT_FOUND, "Landlord not found");
  }

  const temporaryProperty = await prisma.temporaryProperty.findUnique({
    where: { userId },
  });
  if (!temporaryProperty) {
    throw new ApiError(httpStatus.NOT_FOUND, "Temporary property not found");
  }

  const { data: temporaryData } = temporaryProperty.data as any;
  const { propertyImages } = temporaryProperty.data as any;

  const listingData = {
    landlordId: existingLandlord.id,
    email: existingLandlord.email,
    propertyOption: temporaryData?.propertyOption,
    postcode: temporaryData?.propertyDetails?.postcode,
    houseNumber: temporaryData?.propertyDetails?.houseNumber,
    address: temporaryData?.propertyDetails?.address,
    address2: temporaryData?.propertyDetails?.address2,
    propertyType: temporaryData?.propertyDetails?.propertyType,
    bedrooms: temporaryData?.propertyDetails?.bedrooms,
    bathrooms: temporaryData?.propertyDetails?.bathrooms,
    furnishingOptions: temporaryData?.propertyDetails?.furnishingOptions,
    town: temporaryData?.propertyDetails?.town,
    district: temporaryData?.propertyDetails?.district,
    size: temporaryData?.propertyDetails?.size,
    description: temporaryData?.propertyDetails?.description,
    latitude: temporaryData?.propertyDetails?.latitude,
    longitude: temporaryData?.propertyDetails?.longitude,

    propertyImages: propertyImages,

    remoteVideoViewing: temporaryData?.remoteVideoViewing,
    viewingDescription: temporaryData?.viewingDescription,

    monthlyRent: temporaryData?.tenancyDetails?.monthlyRent,
    minimumTenancy: temporaryData?.tenancyDetails?.minimumTenancy,
    weeklyRent: temporaryData?.tenancyDetails?.weeklyRent,
    maximumTenancy: temporaryData?.tenancyDetails?.maximumTenancy,
    depositAmount: temporaryData?.tenancyDetails?.depositAmount,
    moveInDate: temporaryData?.tenancyDetails?.moveInDate,
    billsIncluded: temporaryData?.features?.billsIncluded,
    gardenAccess: temporaryData?.features?.gardenAccess,
    parking: temporaryData?.features?.parking,
    fireplace: temporaryData?.features?.fireplace,

    studentAllowed: temporaryData?.tenantPreferences?.studentAllowed,
    familiesAllowed: temporaryData?.tenantPreferences?.familiesAllowed,
    dssIncomeAccepted: temporaryData?.tenantPreferences?.dssIncomeAccepted,
    petsAllowed: temporaryData?.tenantPreferences?.petsAllowed,
    smokersAllowed: temporaryData?.tenantPreferences?.smokersAllowed,

    termsAgreed: temporaryData?.termsAgreed,

    propertyFor: payload.propertyFor,
    planId: payload.planId,
    transactionId: payload.transactionId,
  };

  const result = await prisma.propertyListing.create({
    data: listingData,
  });

  await prisma.temporaryProperty.delete({
    where: {
      userId: userId,
    },
  });

  return result;
};

const getTemporaryListingFromDB = async (userId: string) => {
  const result = await prisma.temporaryProperty.findUnique({
    where: { userId },
  });

  return result;
};

const getListingAllFromDB = async (
  filters: any,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const {
    searchTerm,
    minBedrooms,
    maxBedrooms,
    minMonthlyRent,
    maxMonthlyRent,
    ...filterData
  } = filters;

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

  // for range of filtering
  if (minBedrooms && maxBedrooms) {
    andConditions.push({
      bedrooms: {
        gte: Number(minBedrooms),
        lte: Number(maxBedrooms),
      },
    });
  }

  if (minMonthlyRent && maxMonthlyRent) {
    andConditions.push({
      monthlyRent: {
        gte: Number(minMonthlyRent),
        lte: Number(maxMonthlyRent),
      },
    });
  }

  for (const key in filterData) {
    if (booleanFields.includes(key) && typeof filterData[key] === "string") {
      if (filterData[key] === "true") {
        filterData[key] = true;
      } else if (filterData[key] === "false") {
        filterData[key] = false;
      }
    }
  }

  if (Object.keys(filterData).length > 0) {
    // if (
    //   typeof filterData.billsIncluded === "string" &&
    //   filterData.billsIncluded === "true"
    // ) {
    //   filterData.billsIncluded = true;
    // } else if (
    //   typeof filterData.billsIncluded === "string" &&
    //   filterData.billsIncluded === "false"
    // ) {
    //   filterData.billsIncluded = false;
    // }
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
  getTemporaryListingFromDB,
  createListingIntoDb,
};
