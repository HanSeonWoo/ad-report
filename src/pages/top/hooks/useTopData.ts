import { useGetData } from "@/hooks/useGetData";
import { useMemo } from "react";

type Params = {
  search_year: number;
};

export type CampaignData = {
  name: string;
  revenue: number;
  percentage: number;
};

export type MonthlyTopDataType = {
  month: number;
  topData: CampaignData[];
  allData: CampaignData[];
  totalRevenue: number;
  totalPositiveRevenue: number;
};

export const useTopData = ({ search_year }: Params) => {
  const { data, isError, isLoading, progress } = useGetData({ search_year });

  const monthlyTopData: MonthlyTopDataType[] = useMemo(() => {
    if (!data || !data.Payment || !data.Payment.Monthly) return [];

    return data.Payment.Monthly.map((month, index) => {
      const allCampaigns = month.App.flatMap((app) => app.Campaign);

      const campaignTotals = allCampaigns.reduce((acc, campaign) => {
        const key = campaign.CampaignName;
        if (!acc[key]) {
          acc[key] = { name: key, revenue: 0 };
        }
        acc[key].revenue += campaign.Revenue;
        return acc;
      }, {} as Record<string, { name: string; revenue: number }>);

      const sortedCampaigns = Object.values(campaignTotals).sort(
        (a, b) => b.revenue - a.revenue
      );

      const totalRevenue = sortedCampaigns.reduce(
        (sum, item) => sum + item.revenue,
        0
      );

      const totalPositiveRevenue = sortedCampaigns.reduce(
        (sum, item) => sum + (item.revenue > 0 ? item.revenue : 0),
        0
      );

      const allDataWithPercentage = sortedCampaigns.map((item) => ({
        ...item,
        percentage:
          item.revenue > 0 ? (item.revenue / totalPositiveRevenue) * 100 : 0,
      }));

      let topData;
      if (sortedCampaigns.length <= 5) {
        topData = allDataWithPercentage;
      } else {
        const top5 = allDataWithPercentage.slice(0, 5);
        const othersRevenue = allDataWithPercentage
          .slice(5)
          .reduce(
            (sum, campaign) =>
              sum + (campaign.revenue > 0 ? campaign.revenue : 0),
            0
          );
        const othersPercentage = (othersRevenue / totalPositiveRevenue) * 100;
        topData = [
          ...top5,
          {
            name: "Others",
            revenue: othersRevenue,
            percentage: othersPercentage,
          },
        ];
      }

      return {
        month: index + 1,
        topData: topData,
        allData: allDataWithPercentage,
        totalRevenue,
        totalPositiveRevenue,
      };
    });
  }, [data]);

  return {
    monthlyTopData,
    isError,
    isLoading,
    progress,
  };
};
