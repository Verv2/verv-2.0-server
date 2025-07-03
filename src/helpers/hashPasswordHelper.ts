import * as bcrypt from "bcrypt";
import config from "../config";

export const hashedPassword = async (password: string): Promise<string> => {
  const saltRounds: number = Number(config.bcrypt_salt_rounds);
  try {
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password");
  }
};
