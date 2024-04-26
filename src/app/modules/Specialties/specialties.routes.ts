import { UserRole } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";

import auth from "../../middlewares/auth";
import { specialtiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { specialtiesValidation } from "./specialties.validation";

const router = express.Router();

router.post(
  "/",
  //   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = specialtiesValidation.create.parse(JSON.parse(req.body.data));
    return specialtiesController.insertIntoDB(req, res, next);
  }
);

export const specialtiesRoutes = router;
