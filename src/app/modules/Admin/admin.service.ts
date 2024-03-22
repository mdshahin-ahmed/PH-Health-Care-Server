import { Admin, Prisma, UserStatus } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";
import { adminSearchAbleFields } from "./admin.constant";

const getAllAdminFromDB = async (params: any, options: any) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDB = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await prisma.admin.findUniqueOrThrow({
      where: { id },
    });
    const deleteAdmin = await transactionClient.admin.delete({
      where: {
        id,
      },
    });
    const deleteUser = await transactionClient.user.delete({
      where: {
        email: deleteAdmin.email,
      },
    });
    return deleteAdmin;
  });
  return result;
};

const softDeleteFromDB = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await prisma.admin.findUniqueOrThrow({
      where: { id },
    });
    const deleteAdmin = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    const deleteUser = await transactionClient.user.update({
      where: {
        email: deleteAdmin.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return deleteAdmin;
  });
  return result;
};

export const adminService = {
  getAllAdminFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
