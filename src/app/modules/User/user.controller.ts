import { Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor created successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Created successfuly!",
    data: result,
  });
});
const getAllUserFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getAllUserFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUserFromDB,
  changeProfileStatus,
};
