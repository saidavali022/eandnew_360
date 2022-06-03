import prisma from "../utils/prisma";

export const getAllShifts = async () => {
  try {
    const shifts = await prisma.shift_timings.findMany({
      distinct: ["employee_id"],
      orderBy: {
        created_at: "desc",
      },
    });
    return shifts;
  } catch (error) {}
};

export const getUserShift = async (userId: string) => {
  try {
    const userShift = await prisma.shift_timings.findFirst({
      where: {
        employee_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return userShift;
  } catch (error) {}
};

export const getUserShifts = async (userId: string, date: string) => {
  try {
    const userShifts = await prisma.shift_timings.findMany({
      where: {
        employee_id: userId,
        // created_at: {
        //   gte: new Date(date),
        // },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return userShifts;
  } catch (error) {}
};

export const createUserShift = async (
  userId: string,
  shift_in: string,
  shift_out: string
) => {
  try {
    const userShift = await prisma.shift_timings.create({
      data: {
        employee_id: userId,
        shift_in: new Date(shift_in),
        shift_out: new Date(shift_out),
      },
    });
    return userShift;
  } catch (error) {}
};
