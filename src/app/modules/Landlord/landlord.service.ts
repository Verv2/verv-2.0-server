import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { TImageFiles, TLandlordUser, TProperty } from "./landlord.interface";
import httpStatus from "http-status";

const addPropertyIntoDB = async (
  user: TLandlordUser,
  payload: TProperty,
  images: TImageFiles
) => {
  const existingLandlord = await prisma.landlord.findUnique({
    where: { userId: user?.userId },
  });

  if (!existingLandlord) {
    throw new ApiError(httpStatus.CONFLICT, "Landlord doesn't exist");
  }

  console.log(existingLandlord);

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

export const LandlordService = {
  addPropertyIntoDB,
};
