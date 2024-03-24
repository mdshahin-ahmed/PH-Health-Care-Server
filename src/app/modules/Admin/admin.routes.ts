import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllAdminFromDB);
router.get("/:id", adminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  adminController.updateIntoDB
);
router.delete("/:id", adminController.deleteFromDB);
router.delete("/soft/:id", adminController.softDeleteFromDB);

export const adminRoutes = router;
