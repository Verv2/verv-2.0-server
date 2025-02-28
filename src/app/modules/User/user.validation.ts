import { UserRole } from "@prisma/client";
import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required!",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.nativeEnum(UserRole, {
      required_error: "Role is required",
    }),
  }),
});

const userProfileValidationSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First Name is required",
    }),
    lastName: z.string({
      required_error: "Last Name is required",
    }),

    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
  }),
});

export const userValidation = {
  userValidationSchema,
  userProfileValidationSchema,
};
