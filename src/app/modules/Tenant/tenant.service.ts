import { Request } from "express";
import { IAuthUser } from "../../interfaces/common";
import prisma from "../../../shared/prisma";

const createTenantProfileIntoDB = async (
  req: Request & { user?: IAuthUser }
) => {
  if (!req.user) {
    throw new Error("User information is missing.");
  }

  console.log(req.body);

  const tenantProfileData = {
    userId: req.user.userId,
    email: req.user.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    profilePhoto: req.file?.path,
    description: req.body.description,
    age: req.body.age,
    minBudget: req.body.minBudget,
    maxBudget: req.body.maxBudget,
    // isAvailable: req.body.isAvailable,
    lookingIn: req.body.lookingIn,
    amenitiesRequired: req.body.amenitiesRequired,
    minAge: req.body.minAge,
    maxAge: req.body.maxAge,
    occupation: req.body.occupation,
  };

  const householdPreferenceData = req.body.householdPreference;
  const availabilityData = req.body.availability;

  const result = await prisma.$transaction(async (tx) => {
    const tenant = await tx.tenant.create({
      data: tenantProfileData,
    });

    // availability
    const availability = await tx.availability.create({
      data: { tenantId: tenant.id, ...availabilityData },
    });

    // household preference
    const householdPreference = await tx.householdPreference.create({
      data: { tenantId: tenant.id, ...householdPreferenceData },
    });

    if (tenant && availability && householdPreference) {
      await tx.user.update({
        where: { id: req.user?.userId },
        data: {
          isProfileUpdated: true,
          profilePhoto: req.file?.path,
        },
      });
    }

    return {
      tenant,
      availability,
      householdPreference,
    };
  });

  return result;
};

const createRentNowTenantInfo = async (req: Request & { user?: IAuthUser }) => {
  if (!req.user) {
    throw new Error("User information is missing.");
  }

  const tenants = req.body.data;

  if (!Array.isArray(tenants) || tenants.length === 0) {
    throw new Error("Tenants array is required.");
  }

  const tenant = await prisma.tenant.findUnique({
    where: { userId: req.user.userId },
  });

  if (!tenant) {
    throw new Error("Tenant not found.");
  }

  const { id: tenantId } = tenant;

  // console.log("tenant Id", tenantId);

  // console.log(tenants);
  // console.log(req.user);

  const results = await Promise.all(
    tenants.map(async (tenant) => {
      return await prisma.rentNowTenantInfo.create({
        data: {
          referredByTenantId: tenantId,
          userId: req?.user?.userId as string,
          email: tenant.email,
          fullName: tenant.fullName,
          phoneNumber: tenant.phoneNumber,
          description: tenant.description || "",
          moveInDate: tenant.moveInDate,
          propertyId: tenant.propertyId,
        },
      });
    })
  );

  return results;
};

export const TenantService = {
  createTenantProfileIntoDB,
  createRentNowTenantInfo,
};
