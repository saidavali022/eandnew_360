import { Router } from "express";
import {
  getUserAttendance,
  updateUserAvailibilityStatus,
} from "../controllers/attendance.controller";

const router = Router();

router.get("/:empId", getUserAttendance);
router.put("/:empId/availablility", updateUserAvailibilityStatus);
// router.put('/:empId/break',)

export default router;
