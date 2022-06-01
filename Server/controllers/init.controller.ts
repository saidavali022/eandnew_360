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
import prisma from "../utils/prisma";
interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
    doj: string;
  };
}

export const initTables = async (req: TypedRequest, res: Response) => {
  console.info("initialize Tables");
  try {
    const user = await prisma.users.create({
      data: {
        employee_id: "END1111",
        role: "user",
        blood_group: "AB+",
        city: "Hyd",
        designation: "software development",
        country: "India",
        email: "eandddeveloper2@gmail.com",
        father_name: "Mohammed",
        first_name: "Robert",
        gender: "Male",
        last_name: "Smith",
        nationality: "Indian",
        highest_qualification: "Bachelors",
        phone: "8765456789",
        state: "Telengana",
        username: "Robert Smith",
        password: "1234#",
        attendance: {
          create: {
            date_in: formatRFC3339(new Date()),
            log_in: new Date().toISOString(),
            shift_in: new Date().toISOString(),
            shift_out: addHours(new Date(), 9),
            status: "available",
            breaks: {
              create: {
                break_start: addMinutes(new Date(), 200),
                break_end: addMinutes(new Date(), 220),
              },
            },
          },
        },
      },
    });

    const user2 = await prisma.users.create({
      data: {
        employee_id: "ENDHR",
        role: "hr",
        blood_group: "AB+",
        city: "Hyd",
        country: "India",
        email: "endhr@gmail.com",
        father_name: "Mohammed",
        first_name: "fname",
        gender: "Male",
        last_name: "lname",
        nationality: "Indian",
        designation: "human resource management",
        highest_qualification: "Bachelors",
        phone: "8765456789",
        state: "Telengana",
        username: "uname",
        password: "1234#",
      },
    });
    const policiesAttendance = await prisma.policies_attedance.createMany({
      data: [
        {
          start_minutes: 8,
          end_minutes: 15,
          point: 1,
          type: "late_login",
        },
        {
          start_minutes: 16,
          end_minutes: 15,
          point: 2,
          type: "late_login",
        },
        {
          start_minutes: 26,
          end_minutes: 40,
          point: 3,
          type: "late_login",
        },
        {
          start_minutes: 41,
          end_minutes: 90,
          point: 4,
          type: "late_login",
          lop: "half-day",
        },
        {
          start_minutes: 15,
          end_minutes: 30,
          point: 0.5,
          type: "early_logoff",
          lop: "half-day",
        },
        { start_minutes: 31, end_minutes: 999, point: 4, type: "early_logoff" },
        // { start_minutes: 999, end_minutes: 999, point: 5, type: "absent" },
      ],
    });

    const userShift = await prisma.shift_timings.create({
      data: {
        shift_in: set(new Date(), { hours: 8, minutes: 0, seconds: 0 }),
        shift_out: set(new Date(), { hours: 17, minutes: 0, seconds: 0 }),
        employee_id: "END1111",
      },
    });
    res.status(200).json({});
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return;
  }
};
