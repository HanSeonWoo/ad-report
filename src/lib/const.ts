export const RESULT_TYPES = [
  "Revenue",
  "Commission",
  "Complete",
  "RevenuePerComplete",
] as const;

export const START_YEAR = 2018;
const END_YEAR = 2021;
export const YEARS = [
  ...Array.from(
    { length: END_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i
  ),
] as const;

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
