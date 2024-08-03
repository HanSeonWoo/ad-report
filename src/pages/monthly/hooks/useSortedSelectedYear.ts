import { useState, useMemo } from "react";
import { YEARS } from "./useMonthData";

export const useSortedSelectedYears = () => {
  const [selectedYears, setSelectedYears] = useState<Set<number>>(
    new Set(YEARS)
  );

  const toggleYear = (year: number) => {
    setSelectedYears((prevYears) => {
      const newYears = new Set(prevYears);
      if (newYears.has(year)) {
        newYears.delete(year);
      } else {
        newYears.add(year);
      }
      return newYears;
    });
  };

  const sortedSelectedYears = useMemo(() => {
    return YEARS.filter((year) => selectedYears.has(year));
  }, [selectedYears]);

  return {
    selectedYears,
    sortedSelectedYears,
    toggleYear,
    allYears: YEARS,
  };
};
