import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { generate } from "generate-password";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.CONFLICT, "User doesn't exists");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const dataForToken = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelpers.generateToken(
    dataForToken,
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    dataForToken,
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const userData = await prisma.user.findUnique({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.CONFLICT, "This user is not found ");
  }

  const dataForToken = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelpers.generateToken(
    dataForToken,
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const logInWithSocialMedia = async (payload: {
  email: string;
  profilePhoto?: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  // create user if user doesn't exit
  if (!user) {
    const password = generate({
      length: 10,
      numbers: true,
    });

    const userData = { ...payload, password };
    const user = await prisma.user.create({
      data: userData,
    });

    // generate tokess
    // const jwtPayload = {
    //   userEmail: user.email,
    //   role: user.role,
    // };
    const dataForToken = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwtHelpers.generateToken(
      dataForToken,
      config.jwt.jwt_secret as Secret,
      config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken(
      dataForToken,
      config.jwt.refresh_token_secret as string,
      config.jwt.refresh_token_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
    };
  } else {
    // generate tokess
    const dataForToken = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwtHelpers.generateToken(
      dataForToken,
      config.jwt.jwt_secret as Secret,
      config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken(
      dataForToken,
      config.jwt.refresh_token_secret as string,
      config.jwt.refresh_token_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
    };
  }
};

export const AuthServices = {
  loginUser,
  refreshToken,
  logInWithSocialMedia,
  // changePassword,
  // forgotPassword,
  // resetPassword,
};
