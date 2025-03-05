import { Request } from "express";
import { IAuthUser } from "../../interfaces/common";
import { TImageFiles, TProperty, TPropertyPayload } from "./landlord.interface";

const addPropertyIntoDB = async (
  payload: TPropertyPayload,
  images: TImageFiles
) => {
  console.log("Add Property Service");

  // const user = req.user;
  // const images = req.files;
  // const payload = req.body;

  const { propertyImages } = images;
  //   payload.images = itemImages.map((image) => image.path);
  const arrImage = propertyImages.map((image) => image.path);

  // console.log(user);
  console.log(payload);
  console.log(arrImage);
};

export const LandlordService = {
  addPropertyIntoDB,
};
