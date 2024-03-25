import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);

  const { refreshToken, ...rest } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: rest,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token generated successfully!",
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully!",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  refreshToken,
  changePassword,
};
