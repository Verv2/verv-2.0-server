import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";
import { hashedPassword } from "../src/helpers/hashPasswordHelper";

import { FurnishingOptions, PropertyFor, PropertyType } from "@prisma/client";

export const listings = [
  {
    propertyOption: "Let Only",
    postcode: "E14 5AB",
    houseNumber: "23",
    address: "23 Elm Street",
    address2: "Flat 2B",
    propertyType: PropertyType.FLAT,
    size: 75.0,
    bedrooms: 2,
    bathrooms: 1,
    furnishingOptions: FurnishingOptions.FURNISHED,
    town: "London",
    district: "Tower Hamlets",
    description: "Bright flat near Canary Wharf.",
    latitude: 51.5074,
    longitude: -0.0235,
    propertyImages: [
      "https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: true,
    viewingDescription: "Available for online viewing.",
    youtubeUrl: "https://youtube.com/watch?v=123",
    propertyFor: PropertyFor.RENT,
    monthlyRent: 1800.0,
    minimumTenancy: 6,
    weeklyRent: 415.38,
    maximumTenancy: 12,
    depositAmount: "2000",
    moveInDate: "2025-09-01",
    billsIncluded: false,
    gardenAccess: false,
    parking: true,
    fireplace: false,
    studentAllowed: true,
    familiesAllowed: true,
    dssIncomeAccepted: false,
    petsAllowed: false,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "basic-plan",
    transactionId: "txn-001",
  },
  {
    propertyOption: "Fully Managed",
    postcode: "SW1A 1AA",
    houseNumber: "10",
    address: "10 Downing Street",
    address2: null,
    propertyType: PropertyType.BEDSIT,
    size: 150.0,
    bedrooms: 4,
    bathrooms: 3,
    furnishingOptions: FurnishingOptions.UNFURNISHED,
    town: "London",
    district: "Westminster",
    description: "Spacious family home in central London.",
    latitude: 51.5034,
    longitude: -0.1276,
    propertyImages: [
      "https://plus.unsplash.com/premium_photo-1686090449192-4ab1d00cb735?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: false,
    viewingDescription: null,
    youtubeUrl: null,
    propertyFor: PropertyFor.RENT,
    monthlyRent: 3500.0,
    minimumTenancy: 12,
    weeklyRent: 807.69,
    maximumTenancy: 24,
    depositAmount: "4000",
    moveInDate: "2025-10-01",
    billsIncluded: true,
    gardenAccess: true,
    parking: false,
    fireplace: true,
    studentAllowed: false,
    familiesAllowed: true,
    dssIncomeAccepted: false,
    petsAllowed: true,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "premium-plan",
    transactionId: "txn-002",
  },
  {
    propertyOption: "Let Only",
    postcode: "M1 1AE",
    houseNumber: "18",
    address: "18 Oxford Road",
    address2: null,
    propertyType: PropertyType.BEDSIT,
    size: 35.0,
    bedrooms: 1,
    bathrooms: 1,
    furnishingOptions: FurnishingOptions.UNFURNISHED,
    town: "Manchester",
    district: "City Centre",
    description: "Modern studio apartment close to university.",
    latitude: 53.4808,
    longitude: -2.2426,
    propertyImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: true,
    viewingDescription: "Schedule via email.",
    youtubeUrl: "https://youtube.com/watch?v=456",
    propertyFor: PropertyFor.RENT,
    monthlyRent: 950.0,
    minimumTenancy: 6,
    weeklyRent: 219.23,
    maximumTenancy: 12,
    depositAmount: "1000",
    moveInDate: "2025-08-15",
    billsIncluded: true,
    gardenAccess: false,
    parking: false,
    fireplace: false,
    studentAllowed: true,
    familiesAllowed: false,
    dssIncomeAccepted: true,
    petsAllowed: false,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "standard-plan",
    transactionId: "txn-003",
  },
  {
    propertyOption: "Fully Managed",
    postcode: "BS1 5TX",
    houseNumber: "12",
    address: "12 Queen Square",
    address2: null,
    propertyType: PropertyType.FLAT,
    size: 60.0,
    bedrooms: 1,
    bathrooms: 1,
    furnishingOptions: FurnishingOptions.FURNISHED,
    town: "Bristol",
    district: "Central",
    description: "Beautiful flat with river views.",
    latitude: 51.4521,
    longitude: -2.593,
    propertyImages: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: true,
    viewingDescription: "Call to schedule.",
    youtubeUrl: null,
    propertyFor: PropertyFor.RENT,
    monthlyRent: 1300.0,
    minimumTenancy: 6,
    weeklyRent: 300.0,
    maximumTenancy: 12,
    depositAmount: "1500",
    moveInDate: "2025-08-01",
    billsIncluded: true,
    gardenAccess: true,
    parking: false,
    fireplace: false,
    studentAllowed: true,
    familiesAllowed: false,
    dssIncomeAccepted: true,
    petsAllowed: false,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "basic-plan",
    transactionId: "txn-004",
  },
  {
    propertyOption: "Let Only",
    postcode: "LS1 4DT",
    houseNumber: "100",
    address: "100 Headrow",
    address2: "Apt 5A",
    propertyType: PropertyType.FLAT,
    size: 50.0,
    bedrooms: 1,
    bathrooms: 1,
    furnishingOptions: FurnishingOptions.UNFURNISHED,
    town: "Leeds",
    district: "City Centre",
    description: "Cozy flat with modern kitchen.",
    latitude: 53.8008,
    longitude: -1.5491,
    propertyImages: [
      "https://images.unsplash.com/photo-1510563800743-aed236490d08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510563800743-aed236490d08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: false,
    viewingDescription: null,
    youtubeUrl: null,
    propertyFor: PropertyFor.RENT,
    monthlyRent: 1050.0,
    minimumTenancy: 9,
    weeklyRent: 242.3,
    maximumTenancy: 18,
    depositAmount: "1100",
    moveInDate: "2025-09-10",
    billsIncluded: false,
    gardenAccess: false,
    parking: true,
    fireplace: false,
    studentAllowed: true,
    familiesAllowed: false,
    dssIncomeAccepted: false,
    petsAllowed: true,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "standard-plan",
    transactionId: "txn-005",
  },
  {
    propertyOption: "Let Only",
    postcode: "B1 1AA",
    houseNumber: "45",
    address: "45 New Street",
    address2: "Flat 7",
    propertyType: PropertyType.FLAT,
    size: 65.0,
    bedrooms: 2,
    bathrooms: 1,
    furnishingOptions: FurnishingOptions.FURNISHED,
    town: "Birmingham",
    district: "City Centre",
    description: "Ideal for professionals working in the city.",
    latitude: 52.4786,
    longitude: -1.9086,
    propertyImages: [
      "https://plus.unsplash.com/premium_photo-1661281277034-b368fa7a6b69?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: true,
    viewingDescription: "Available by appointment.",
    youtubeUrl: "https://youtube.com/watch?v=abc123",
    propertyFor: PropertyFor.RENT,
    monthlyRent: 1200.0,
    minimumTenancy: 6,
    weeklyRent: 276.92,
    maximumTenancy: 12,
    depositAmount: "1300",
    moveInDate: "2025-08-20",
    billsIncluded: false,
    gardenAccess: false,
    parking: true,
    fireplace: false,
    studentAllowed: true,
    familiesAllowed: true,
    dssIncomeAccepted: false,
    petsAllowed: false,
    smokersAllowed: true,
    termsAgreed: true,
    planId: "basic-plan",
    transactionId: "txn-006",
  },
  {
    propertyOption: "Fully Managed",
    postcode: "EH1 1YZ",
    houseNumber: "5",
    address: "5 Princes Street",
    address2: null,
    propertyType: PropertyType.FLAT,
    size: 80.0,
    bedrooms: 3,
    bathrooms: 2,
    furnishingOptions: FurnishingOptions.UNFURNISHED,
    town: "Edinburgh",
    district: "Old Town",
    description: "Classic Edinburgh flat with castle views.",
    latitude: 55.9533,
    longitude: -3.1883,
    propertyImages: [
      "https://plus.unsplash.com/premium_photo-1661778812498-d56d7f09d1fd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1676321046262-4978a752fb15?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: true,
    viewingDescription: "Virtual tour available.",
    youtubeUrl: "https://youtube.com/watch?v=castleview",
    propertyFor: PropertyFor.RENT,
    monthlyRent: 1900.0,
    minimumTenancy: 12,
    weeklyRent: 438.46,
    maximumTenancy: 24,
    depositAmount: "2100",
    moveInDate: "2025-11-01",
    billsIncluded: true,
    gardenAccess: false,
    parking: false,
    fireplace: true,
    studentAllowed: false,
    familiesAllowed: true,
    dssIncomeAccepted: true,
    petsAllowed: true,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "premium-plan",
    transactionId: "txn-007",
  },
  {
    propertyOption: "Let Only",
    postcode: "NG1 5FS",
    houseNumber: "22",
    address: "22 Market Square",
    address2: "Flat 4",
    propertyType: PropertyType.BEDSIT,
    size: 40.0,
    bedrooms: 1,
    bathrooms: 1,
    furnishingOptions: FurnishingOptions.FURNISHED,
    town: "Nottingham",
    district: "City Centre",
    description: "Compact studio perfect for students.",
    latitude: 52.9548,
    longitude: -1.1581,
    propertyImages: [
      "https://plus.unsplash.com/premium_photo-1673014202349-38687dd47f94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1673014201500-f13a3a4adf27?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: true,
    viewingDescription: "Schedule online.",
    youtubeUrl: "https://youtube.com/watch?v=studentstudio",
    propertyFor: PropertyFor.RENT,
    monthlyRent: 900.0,
    minimumTenancy: 6,
    weeklyRent: 207.69,
    maximumTenancy: 12,
    depositAmount: "950",
    moveInDate: "2025-09-01",
    billsIncluded: true,
    gardenAccess: false,
    parking: false,
    fireplace: false,
    studentAllowed: true,
    familiesAllowed: false,
    dssIncomeAccepted: true,
    petsAllowed: false,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "standard-plan",
    transactionId: "txn-008",
  },
  {
    propertyOption: "Let Only",
    postcode: "CF10 1EP",
    houseNumber: "9",
    address: "9 St Mary Street",
    address2: null,
    propertyType: PropertyType.FLAT,
    size: 55.0,
    bedrooms: 2,
    bathrooms: 1,
    furnishingOptions: FurnishingOptions.UNFURNISHED,
    town: "Cardiff",
    district: "Central",
    description: "Quiet 2-bedroom flat near city centre.",
    latitude: 51.4816,
    longitude: -3.1791,
    propertyImages: [
      "https://plus.unsplash.com/premium_photo-1673014201500-f13a3a4adf27?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1673014201500-f13a3a4adf27?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    remoteVideoViewing: false,
    viewingDescription: null,
    youtubeUrl: null,
    propertyFor: PropertyFor.RENT,
    monthlyRent: 1100.0,
    minimumTenancy: 6,
    weeklyRent: 253.85,
    maximumTenancy: 18,
    depositAmount: "1200",
    moveInDate: "2025-10-15",
    billsIncluded: false,
    gardenAccess: false,
    parking: true,
    fireplace: false,
    studentAllowed: true,
    familiesAllowed: true,
    dssIncomeAccepted: false,
    petsAllowed: false,
    smokersAllowed: false,
    termsAgreed: true,
    planId: "basic-plan",
    transactionId: "txn-009",
  },
];

const seedDummyLandlord = async () => {
  const dummyLandlordEmail = "dummy_landlord@mail.com" as string;

  try {
    const isExistDummyLandlord = await prisma.user.findUnique({
      where: {
        email: dummyLandlordEmail,
      },
    });

    if (isExistDummyLandlord) {
      console.log("Dummy Landlord already exists!");
      return;
    }

    const hashPassword = await hashedPassword("dummy_landlord");

    const data = {
      email: dummyLandlordEmail,
      password: hashPassword,
      role: UserRole.LANDLORD,
    };

    const superAdminData = await prisma.user.create({
      data: data,
    });

    console.log("Dummy Landlord created successfully", superAdminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

const dummyLandlordProfile = async () => {
  const dummyLandlordEmail = "dummy_landlord@mail.com" as string;
  try {
    const isExistDummyLandlord = await prisma.user.findUnique({
      where: {
        email: dummyLandlordEmail,
      },
    });

    const isExistDummyLandlordProfile = await prisma.landlord.findFirst({
      where: { email: isExistDummyLandlord?.email },
    });

    if (isExistDummyLandlordProfile) {
      console.log("Dummy Landlord Profile already exists!");
      return;
    }

    const data = {
      userId: isExistDummyLandlord?.id as string,
      email: isExistDummyLandlord?.email as string,
      firstName: "Dummy",
      lastName: "Landlord",
      phoneNumber: "+8801234567890",
      languages: ["English", "Bengali"],
    };

    const dummyLandlordData = await prisma.landlord.create({
      data: data,
    });

    console.log("Dummy Landlord created successfully", dummyLandlordData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

const dummyListings = async () => {
  const dummyLandlordEmail = "dummy_landlord@mail.com" as string;

  try {
    const dummyLandlordProfile = await prisma.landlord.findFirst({
      where: { email: dummyLandlordEmail },
    });

    if (!dummyLandlordProfile?.id || !dummyLandlordProfile?.email) {
      console.error("Dummy landlord profile is missing id or email.");
      return;
    }

    const listingsWithLandlord = listings.map((listing) => ({
      ...listing,
      landlordId: dummyLandlordProfile.id,
      email: dummyLandlordProfile.email,
    }));

    for (const listing of listingsWithLandlord) {
      await prisma.propertyListing.create({ data: listing });
    }

    console.log("Dummy property listings inserted successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

const seed = async () => {
  await seedDummyLandlord();
  await dummyLandlordProfile();
  await dummyListings();
};

seed();
