import prisma from "../utils/prisma";
import { addDays, format, set, addHours, differenceInMinutes } from "date-fns";
import { attendance_available_status } from "@prisma/client";
import * as ShiftService from "../services/shifts.service";

export const getUserAttendance = async (userId: string, date: string) => {
  try {
    const user: any = await prisma.users.findUnique({
      where: { employee_id: userId },
      select: {
        doj: true,
      },
    });

    let attendance_start_date = new Date();
    if (date == null) {
      date = format(new Date(), "yyyy-mm");
    }
    attendance_start_date.setMonth(new Date(date).getMonth());
    attendance_start_date.setFullYear(new Date(date).getFullYear());
    attendance_start_date.setDate(new Date(user?.doj).getDate());
    attendance_start_date.setMinutes(0);
    attendance_start_date.setHours(0);
    let attendance_end_date = new Date(attendance_start_date);
    attendance_end_date.setMonth(attendance_end_date.getMonth() + 1);

    const emp_attendance = await prisma.attendance.findMany({
      where: {
        employee_id: userId,
        date_in: {
          gte: attendance_start_date,
          lte: attendance_end_date,
        },
      },
      include: {
        breaks: {
          select: {
            break_start: true,
            break_end: true,
          },
        },
      },
    });

    return emp_attendance;
  } catch (e) {
    console.error(e);
    throw Error("Error While Getting User Attendance");
  }
};

export const markUserAttendance = async (userId: string) => {
  try {
    //check if todays attendance is made else mark attendance
    const isUserPresentToday = await userTodayAttendance(userId);

    if (isUserPresentToday != null) {
      return { message: "Attendance Already Marked", status: 409 };
    }

    let shift_in = new Date();
    let shift_out = addHours(new Date(), 9);
    const userShift = await ShiftService.getUserShift(userId);

    if (userShift != null) {
      shift_in = userShift.shift_in;
      shift_out = userShift.shift_out;
    }
    const late_minutes = differenceInMinutes(shift_in, new Date());
    let login_penalty = 0;
    let lop_penalty = null;
    const penalty = await prisma.policies_attedance.findFirst({
      where: {
        start_minutes: {
          gte: late_minutes,
        },
        end_minutes: {
          lte: late_minutes,
        },
      },
    });

    if (penalty != null) {
      login_penalty = penalty.point;
      lop_penalty = penalty.lop;
    }

    const markAttendance = await prisma.attendance.create({
      data: {
        employee_id: userId,
        shift_in,
        shift_out,
        date_in: new Date(),
        log_in: new Date(),
        status: attendance_available_status.available,
        points: login_penalty,
        lop: lop_penalty,
      },
    });

    return markAttendance;
  } catch (error) {
    console.error(error);
    throw Error("Error While Marking User Attendance");
  }
};

export const updateUserAvailibilityStatus = async (
  userId: string,
  attendanceId: any,
  presentAttendanceStatus: string,
  status: attendance_available_status
) => {
  try {
    let shift_time_in = new Date();
    let shift_time_out = new Date();

    if (status == "break") {
      //Break start
      const attendanceUpdate = await prisma.attendance.update({
        where: {
          id: parseInt(attendanceId),
        },
        data: {
          status,
          breaks: {
            create: {
              break_start: new Date(),
            },
          },
        },
      });

      return attendanceUpdate;
    }

    if (
      presentAttendanceStatus == "break" &&
      (status == "available" || status == "salah")
    ) {
      //Break End
      const userLastBreak = await prisma.breaks.findFirst({
        where: {
          attendance_Id: attendanceId,
        },
        orderBy: { id: "desc" },
      });

      if (userLastBreak != null) {
        // if break exist and set break end
        const break_id = userLastBreak.id;
        const attendanceUpdate = await prisma.attendance.update({
          where: {
            id: attendanceId,
          },
          data: {
            status,
            breaks: {
              update: {
                where: {
                  id: break_id,
                },
                data: { break_end: new Date() },
              },
            },
          },
        });
        return attendanceUpdate;
      }
    }

    if (
      (presentAttendanceStatus == "available" && status == "salah") ||
      (presentAttendanceStatus == "salah" && status == "available")
    ) {
      const attendanceUpdate = await prisma.attendance.update({
        where: {
          id: parseInt(attendanceId),
        },
        data: {
          status,
        },
      });
      return attendanceUpdate;
    }
  } catch (error) {
    console.error(error);
    throw Error("Error While Updating User Availability Status");
  }
};

export const getUserAvailability = async (userId: string) => {
  //check if today present then get availability status from attendance
  try {
    const isUserPresentToday = await userTodayAttendance(userId);

    if (isUserPresentToday == null) {
      return { status: "unavailable" };
    }

    return { status: isUserPresentToday.status };
  } catch (error) {
    console.error(error);
    throw Error("Error While Getting Availability Status");
  }
};

export const userTodayAttendance = async (userId: string) => {
  let shift_in = new Date();
  let shift_out = addHours(new Date(), 9);
  try {
    const userShift = await ShiftService.getUserShift(userId);

    if (userShift != null) {
      shift_in = userShift.shift_in;
      shift_out = userShift.shift_out;
    }

    const date_in = new Date(format(new Date(), "yyyy-MM-dd"));
    const an_hour_before_shift_log_in = set(shift_in, {
      hours: shift_in.getHours() - 1,
    });

    const checkTodaysAttendance = await prisma.attendance.findFirst({
      where: {
        employee_id: userId,
        date_in,
        log_in: {
          gte: an_hour_before_shift_log_in,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return checkTodaysAttendance;
  } catch (error) {
    console.error(error);
    throw Error("Error While Checking User Attendance for Today");
  }
};

export const markUserLogOff = async (userId: string) => {
  try {
    const userAvailability = await getUserAvailability(userId);
    if (userAvailability.status != "available") {
      throw new Error("Change Status to Available before logOff");
    }
    const userAttendance = await userTodayAttendance(userId);

    const userLogOff = await prisma.attendance.update({
      where: {
        id: userAttendance?.id,
      },
      data: {
        log_out: new Date(),
      },
    });
    return userAttendance;
  } catch (error) {
    throw new Error("Error While ");
  }
};
