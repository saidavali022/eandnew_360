import { Router } from "express";
import {
  getUserShifts,
  createUserShift,
} from "../controllers/shifts.controller";

const router = Router();

router.get("/:empId", getUserShifts);
router.post("/:empId", createUserShift);

export default router;
