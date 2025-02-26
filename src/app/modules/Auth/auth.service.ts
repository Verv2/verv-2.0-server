const loginUser = async (payload: { email: string; password: string }) => {
  console.log("Payload from service: ", payload);
};

export const AuthServices = {
  loginUser,
  // refreshToken,
  // changePassword,
  // forgotPassword,
  // resetPassword,
};
