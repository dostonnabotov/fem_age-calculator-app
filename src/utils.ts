export const validateDay = (day: number): string => {
  if (day < 0 || day > 31) return "invalid";

  return "";
};

export const validateMonth = (month: number): string => {
  if (month < 0 || month > 12) return "invalid";

  return "";
};

export const validateYear = (year: number): string => {
  if (year < 0 || year > new Date().getFullYear()) return "invalid";

  return "";
};

export const dateDifference = (
  day: number,
  month: number,
  year: number
): number[] => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  let ageYear = currentYear - year;
  let ageMonth = currentMonth - month;
  let ageDay = currentDay - day;

  if (ageMonth < 0) {
    ageYear--;
    ageMonth = Math.abs(ageMonth);
  }

  if (ageDay < 0) {
    ageMonth--;
    ageDay = Math.abs(ageDay);
  }

  return [ageDay, ageMonth, ageYear];
};
