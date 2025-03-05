export type TProperty = {
  propertyOption:
    | "Whole property"
    | "Individual rooms"
    | "Either whole property or individual rooms";

  postcode: string;
  houseNumber: string;
  address: string;
  address2?: string;
  propertyType: "Flat" | "Bedsit";
  bedrooms: number;
  bathrooms: number;
  furnishingOptions: "Furnished" | "Unfurnished" | "Choice";
  town: string;
  description: string;
  remoteVideoViewing: boolean;
  viewingDescription?: string;
  youtubeUrl?: string;
  termsAgreed: boolean;
};

export type TImageFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
};

export type TPropertyPayload = {
  userId: string;
  email: string;
  role: "LANDLORD";
  iat: number;
  exp: number;
  data: TProperty;
};

export type TImageFiles = { [fieldname: string]: Express.Multer.File[] };
