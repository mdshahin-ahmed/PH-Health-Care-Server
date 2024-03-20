import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { adminService } from "./admin.service";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllAdminFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Admin data fetched!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong!",
      error: err,
    });
  }
};

export const adminController = {
  getAllAdminFromDB,
};
