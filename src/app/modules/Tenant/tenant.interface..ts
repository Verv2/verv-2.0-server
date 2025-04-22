// enums
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

// Availability
export interface Availability {
  // id: string;
  //   tenantId: string;
  moveIn: string;
  minTerm: string;
  maxTerm: string;
}

// Household Preference
export interface HouseholdPreference {
  // id: string;
  //   tenantId: string;
  isSmoker: boolean;
  isPetOwner: boolean;
  occupation: string;
  minAge: number;
  maxAge: number;
  gender: Gender;
  // isDeleted: boolean;
  // createdAt: Date;
  // updatedAt: Date;
}

// Tenant
export interface Tenant {
  // id: string;
  //   userId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  description: string;
  age: number;
  minBudget: number;
  maxBudget: number;
  isAvailable: boolean;
  lookingIn: string[];
  amenitiesRequired: string[];
  minAge: number;
  maxAge: number;
  occupation: string;
  isDeleted: boolean;
  householdPreference?: HouseholdPreference;
  availability?: Availability;
}
