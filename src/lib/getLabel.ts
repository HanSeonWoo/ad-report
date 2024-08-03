import { ResultType } from "./type";

export const getLabel = (key: ResultType): string => {
  switch (key) {
    case "Revenue":
      return "수익";
    case "Commission":
      return "수수료";
    case "Complete":
      return "캠페인 완료 수";
    case "RevenuePerComplete":
      return "캠페인 당 수익";
  }
};
