import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { specialtiesServices } from "./specialties.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtiesServices.insertIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

export const specialtiesController = {
  insertIntoDB,
};
