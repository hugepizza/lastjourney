import dayjs from "dayjs";

export const isTimestampInTodayRange = (timestamp: number) => {
  const currentTime = dayjs();
  const startOfDay = currentTime.startOf("day").subtract(1, "second");
  const endOfDay = currentTime.endOf("day");
  const targetTime = dayjs.unix(timestamp);

  return targetTime.isAfter(startOfDay) && targetTime.isBefore(endOfDay);
};

export const isTimestampInThisWeek = (timestamp: number) => {
  const currentTime = dayjs();
  const startOfWeek = currentTime.startOf("week").subtract(1, "second");
  const endOfWeek = currentTime.endOf("week");
  const targetTime = dayjs.unix(timestamp);
  return targetTime.isAfter(startOfWeek) && targetTime.isBefore(endOfWeek);
};

export const isTimestampBeforeNow = (timestamp: number) => {
  const currentTime = dayjs();
  const targetTime = dayjs.unix(timestamp);
  return targetTime.isBefore(currentTime);
};
export const isTimestampAfterNow = (timestamp: number) => {
  const currentTime = dayjs();
  const targetTime = dayjs.unix(timestamp);
  return targetTime.isAfter(currentTime);
};

export const isTimestampInRange = (
  timestamp: number,
  ts1: number,
  ts2: number,
) => {
  const targetTime = dayjs.unix(timestamp);
  return (
    targetTime.isAfter(dayjs.unix(ts1)) && targetTime.isBefore(dayjs.unix(ts2))
  );
};
