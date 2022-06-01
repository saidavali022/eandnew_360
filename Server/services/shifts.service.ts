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
