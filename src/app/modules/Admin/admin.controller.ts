import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { adminService } from "./admin.service";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (req: Request, res: Response) => {
  const result = await adminService.getAllAdminFromDB();
  res.status(200).json({
    success: true,
    message: "Admin data fetched!",
    data: result,
  });
};

export const adminController = {
  getAllAdminFromDB,
};
