import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);

    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);

    const result = await adminService.getAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin data fetched!",
      meta: result.meta,
      data: result.data,
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
