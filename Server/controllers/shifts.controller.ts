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
