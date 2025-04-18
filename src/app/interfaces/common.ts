import { UserRole } from "@prisma/client";

export type IAuthUser = {
  userId: string;
  email: string;
  role: UserRole;
} | null;

// export type TUser = {
//   userId: string;
//   email: string;
//   role: UserRole;
// };
