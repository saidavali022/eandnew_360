import prisma from "../utils/prisma";
import { attendance_available_status } from "@prisma/client";
import Express, { Request, Response, NextFunction } from "express";
import * as AttendanceService from "../services/attendance.service";
import * as ShiftService from "../services/shifts.service";
import {
  set,
  add,
  addHours,
  addMinutes,
  addMilliseconds,
  setMilliseconds,
  setSeconds,
  format,
} from "date-fns";

interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
    doj?: string;
  };
  body: {
    status: attendance_available_status;
    attendId: number;
  };
}

interface IAttendanceUpdateData {
  status: string;
  breaks: {
    create?: {
      break_start?: Date;
    };
    update?: {
      where: {
        id: number;
      };
      data: {
        break_end?: Date;
      };
    };
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
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const getUserAvailability = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const presentUserStatus = await AttendanceService.getUserAvailability(
      empId
    );

    res.status(200).json(presentUserStatus);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const markUserAttendance = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const markAttendance = await AttendanceService.markUserAttendance(empId);
    res.status(201).json(markAttendance);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const markUserLogOff = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const checkUserAvailable = await AttendanceService.getUserAvailability(
      empId
    );
    if (checkUserAvailable.status != "available") {
      throw new Error("First Change Your Status to Available then Log out");
    }

    const markLogOff = await AttendanceService.markUserLogOff(empId);
    return res.status(200).json(markLogOff);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const updateUserAvailibilityStatus = async (
  req: TypedRequest,
  res: Response
) => {
  const { empId } = req.params;
  const { status } = req.body;
  let shift_time_in = new Date();
  let shift_time_out = new Date();
  let attendId;
  try {
    if (status == "unavailable") {
      throw new Error("Cannot Set Unavailable");
    }

    const presentUserStatus = await AttendanceService.getUserAvailability(
      empId
    );

    if (status == presentUserStatus.status) {
      throw new Error(`Status is already ${status}`);
    }

    if (
      presentUserStatus.status == "unavailable" &&
      (status == "available" || status == "break" || status == "salah")
    ) {
      throw new Error("mark attendance before requesting for update of status");
    }

    // get user shift timings
    const userShift = await ShiftService.getUserShift(empId);

    if (userShift != null) {
      shift_time_in = userShift.shift_in;
      shift_time_out = userShift.shift_out;
    }

    if (
      presentUserStatus.status == "available" ||
      presentUserStatus.status == "break" ||
      presentUserStatus.status == "salah"
    ) {
      //get get attendacne id
      const date_in = new Date(format(new Date(), "yyyy-MM-dd"));
      const an_hour_before_shift_log_in = set(shift_time_in, {
        hours: shift_time_in.getHours() - 1,
      });

      const attendance = await prisma.attendance.findFirst({
        where: {
          employee_id: empId,
          date_in,
          log_in: {
            gte: an_hour_before_shift_log_in,
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      if (attendance == null) {
        throw new Error("Mark Attendance First before requesting for a break");
      }
      attendId = attendance.id;
    }

    const updatedAttendanceStatus =
      await AttendanceService.updateUserAvailibilityStatus(
        empId,
        attendId,
        presentUserStatus.status,
        status
      );

    res.status(200).json(updatedAttendanceStatus);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
    return;
  }
};
