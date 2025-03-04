import { TImageFiles, TProperty } from "./landlord.interface";

const addPropertyIntoDB = async (payload: TProperty, images: TImageFiles) => {
  console.log("Add Property Service");

  const { propertyImages } = images;
  //   payload.images = itemImages.map((image) => image.path);
  const arrImage = propertyImages.map((image) => image.path);

  console.log(payload);
  console.log(arrImage);
};

export const LandlordService = {
  addPropertyIntoDB,
};
