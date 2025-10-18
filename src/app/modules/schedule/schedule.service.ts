import { addMinutes, addHours, format } from "date-fns";
import { prisma } from "../../shared/prisma";

const insertIntoDB = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;

  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          format(currentDate, "yyyy-MM-dd"),
          Number(startTime.split(":")[0]) // 11:00
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(addHours(format(lastDate, "yyyy-MM-dd"), Number(endTime.split(":")[0])), Number(endTime.split(":")[1]))
    );

    while (startDateTime < endDateTime) {
      const slotStartDateTime = startDateTime; // 10:00
      const slotEndDateTime = addMinutes(startDateTime, intervalTime); // 10:30

      const existingSchedule = await prisma.schedule.findFirst({
        where: { startDateTime: slotStartDateTime, endDateTime: slotEndDateTime },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: { startDateTime: slotStartDateTime, endDateTime: slotEndDateTime },
        });
        schedules.push(result);
      }

      slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const schedulesForDoctor = async () => {};

const deleteScheduleFromDB = async (id: string) => {};

export const ScheduleService = {
  insertIntoDB,
  schedulesForDoctor,
  deleteScheduleFromDB,
};
