import axios from "axios";

export type CampaignType = {
  CampaignName: string;
  Datetime: string;
  Revenue: number;
  Commission: number;
  Complete: number;
  CampaignKey: string;
  AppKey: number;
};

export type AppType = {
  AppName: string;
  Revenue: number;
  Commission: number;
  Complete: number;
  AppKey: number;
  Campaign: CampaignType[];
};

export type MonthlyDataType = {
  Status: number;
  Datetime: string;
  Revenue: number;
  Commission: number;
  Complete: number;
  AppKey: number;
  App: AppType[];
};

export type PaymentType = {
  Revenue: number;
  Commission: number;
  Complete: number;
  Monthly: MonthlyDataType[];
};

export type AdSettlementResponseType = {
  Payment: PaymentType;
  Result: boolean;
  IsTest: boolean;
  ResultCode: number;
  ResultMsg: string;
};

export interface AdSettlementParams {
  search_year: number;
  search_month?: number;
}

const api = axios.create({
  baseURL: "https://coding-test.adpopcorn.com/api/v1/report/demo",
  headers: {
    "Content-Type": "application/json",
  },
});

// API 호출 함수
export const fetchAdSettlementData = async (
  params: AdSettlementParams
): Promise<AdSettlementResponseType> => {
  try {
    const response = await api.post<AdSettlementResponseType>(
      "/GetDemoData",
      params
    );

    if (!response.data.Result) {
      throw new Error(response.data.ResultMsg);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API 요청 실패: ${error.message}`);
    } else {
      throw new Error("알 수 없는 에러가 발생했습니다.");
    }
  }
};

// 데이터 변환 함수
export const transformApiResponse = (data: AdSettlementResponseType) => {
  return {
    ...data,
    Payment: {
      ...data.Payment,
      Monthly: data.Payment.Monthly.map((month) => ({
        ...month,
        Datetime: new Date(
          parseInt(month.Datetime.replace(/\/Date\((\d+)\)\//, "$1"))
        ),
      })),
    },
  };
};

// TanStack Query용 queryFn
export const getAdSettlementData = async ({
  search_year,
  search_month,
}: AdSettlementParams) => {
  const data = await fetchAdSettlementData({ search_year, search_month });
  return transformApiResponse(data);
};
