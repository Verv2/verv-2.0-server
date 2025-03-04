export type TProperty = {
  title: string;
  description: string;
  images?: string[];
  // city: District;
  // location: string;
  // dateFound: Date;
  // status: keyof typeof ITEM_STATUS;
  // isReported?: boolean;
  // reportCount?: number;
  // user: ObjectId;
  // category: ObjectId;
  // questions?: string[];
  // createdAt?: Date;
  // updatedAt?: Date;
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

export type TImageFiles = { [fieldname: string]: Express.Multer.File[] };
