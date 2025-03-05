import prisma from "../../../shared/prisma";
import { TImageFiles, TProperty, TPropertyPayload } from "./landlord.interface";

const addPropertyIntoDB = async (payload: TProperty, images: TImageFiles) => {
  console.log("Add Property Service");

  const { propertyImages } = images;
  const arrImages = propertyImages.map((image) => image.path);

  const propertyData = { ...payload, propertyImages: arrImages };

  console.log(propertyData);

  const result = await prisma.propertyListing.create({
    data: propertyData,
  });

  return result;
};

export const LandlordService = {
  addPropertyIntoDB,
};
