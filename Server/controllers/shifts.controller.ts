import {
  addMinutes,
  subMinutes,
  subDays,
  addDays,
  addHours,
  format,
  formatRFC3339,
  set,
} from "date-fns";
import prisma from "../utils/prisma";
import Express, { Request, Response, NextFunction } from "express";
interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
  };
}

export const getUserShifts = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const userShifts = await prisma.shift_timings.findMany({
      where: {
        employee_id: empId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json(userShifts);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
    return;
  }
};

export const createUserShift = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  const { shift_in, shift_out } = req.body;
  try {
    console.info(shift_in, shift_out);
    const userShifts = await prisma.shift_timings.create({
      data: {
        employee_id: empId,
        shift_in: new Date(shift_in),
        shift_out: new Date(shift_out),
      },
    });
    res.status(200).json(userShifts);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
    return;
  }
};
