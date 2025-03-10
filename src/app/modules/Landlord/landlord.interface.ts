export type TProperty = {
  landlordId: string;
  email: string;
  role: "LANDLORD";
  propertyOption:
    | "Whole property"
    | "Individual rooms"
    | "Either whole property or individual rooms";

  postcode: string;
  houseNumber: string;
  address: string;
  address2?: string;
  propertyType: "FLAT" | "BEDSIT";
  bedrooms: number;
  bathrooms: number;
  furnishingOptions: "FURNISHED" | "UNFURNISHED" | "CHOICE";
  town: string;
  description: string;
  propertyImages?: string[];
  remoteVideoViewing: boolean;
  viewingDescription?: string;
  youtubeUrl?: string;

  monthlyRent: number;
  minimumTenancy: number;
  weeklyRent: number;
  maximumTenancy: number;
  depositAmount: number;

  billsIncluded: boolean;
  gardenAccess: boolean;
  parking: boolean;
  fireplace: boolean;

  studentAllowed: boolean;
  familiesAllowed: boolean;
  dssIncomeAccepted: boolean;
  petsAllowed: boolean;
  smokersAllowed: boolean;

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

export type TLandlordUser = {
  userId: string;
  email: string;
  role: "LANDLORD";
};

export type TImageFiles = { [fieldname: string]: Express.Multer.File[] };
