import Express, { Request, Response, NextFunction } from "express";
import * as AttendanceService from "../services/attendance.service";
import {
  set,
  add,
  addHours,
  addMinutes,
  addMilliseconds,
  setMilliseconds,
  setSeconds,
} from "date-fns";

interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
    doj: string;
  };
}

export const getUserAttendance = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  let { date } = req.query;
  try {
    const emp_attendance: any = await AttendanceService.getUserAttendance(
      empId,
      date
    );

    if (!emp_attendance) {
      res.status(500).json({ message: "empty" });
    }

    res.status(200).json(emp_attendance);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
    return;
  }
};

export const updateUserAvailibilityStatus = async (
  req: Request,
  res: Response
) => {
  const { empId } = req.params;
  const { status, attendId } = req.body;
  let shift_time_in = new Date();
  let shift_time_out = new Date();

  try {
    // get user shift timings
    const userShift = await prisma.shift_timings.findFirst({
      where: {
        employee_id: empId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (userShift != null) {
      shift_time_in = userShift.time_in;
      shift_time_out = userShift.time_out;
    }

    const user_shift_login_time = set(new Date(), {
      hours: shift_time_in.getHours(),
      minutes: shift_time_in.getMinutes(),
      seconds: 0,
      milliseconds: 0,
    });

    const user_shift_logout_time = add(user_shift_login_time, {
      hours: shift_time_out.getHours(),
      minutes: shift_time_out.getMinutes(),
    });

    const availablility = await prisma.attendance.upsert({
      where: {
        id: attendId,
      },
      update: {},
      create: {},
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
    return;
  }
};
