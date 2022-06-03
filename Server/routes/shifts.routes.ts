import { Router } from "express";
import {
  getUserShifts,
  createUserShift,
  getAllShifts,
} from "../controllers/shifts.controller";

const router = Router();
router.get("/", getAllShifts);
router.get("/:empId", getUserShifts);
router.post("/:empId", createUserShift);

export default router;
