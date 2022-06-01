import { Router } from "express";
import { getUserShifts } from "../controllers/shifts.controller";

const router = Router();

router.get("/:empId", getUserShifts);

export default router;
