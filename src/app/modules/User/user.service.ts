import config from "../../../config";
import prisma from "../../../shared/prisma";
import { TUser } from "./user.interface";
import * as bcrypt from "bcrypt";

const registerUserIntoDB = async (payload: TUser) => {
  console.log("request has been sent from controller", payload);

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const userData = {
    email: payload.email,
    password: hashedPassword,
    role: payload.role,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};

export const userService = {
  registerUserIntoDB,
};
