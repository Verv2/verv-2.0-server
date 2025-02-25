import { UserRole } from "@prisma/client";
import { z } from "zod";

const userValidationSchema = z.object({
  email: z.string({
    required_error: "Email is required!",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
  role: z.nativeEnum(UserRole, {
    required_error: "Role is required",
  }),
});

export const userValidation = {
  userValidationSchema,
};
