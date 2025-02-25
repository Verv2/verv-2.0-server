import { z } from "zod";
import { userValidation } from "./user.validation";

export type TUser = z.infer<
  typeof userValidation.userValidationSchema.shape.body
>;
