import { TImageFiles, TPropertyPayload } from "./landlord.interface";

const addPropertyIntoDB = async (
  payload: TPropertyPayload,
  images: TImageFiles
) => {
  console.log("Add Property Service");

  const { propertyImages } = images;
  const arrImage = propertyImages.map((image) => image.path);

  console.log(payload);
  console.log(arrImage);
};

export const LandlordService = {
  addPropertyIntoDB,
};
