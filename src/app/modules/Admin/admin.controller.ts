import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllAdminFromDB: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, adminFilterableFields);

    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);

    const result = await adminService.getAllAdminFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched By id!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminService.updateIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const softDeleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminService.softDeleteFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const adminController = {
  getAllAdminFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
