import { ContentLayout } from "@/components/admin-panel/ContentLayout";
import { useState } from "react";
import TopCampaignsChart from "./components/TopCampaignsChart";
import TopCampaignsTable from "./components/TopCampaignsTable";
import { useTopData } from "./hooks/useTopData";
import { Progress } from "@/components/ui/progress";
import { YEARS } from "@/lib/const";

export default function TopPage() {
  const [year, setYear] = useState(YEARS[YEARS.length - 1]);
  const [month, setMonth] = useState(1);
  const { monthlyTopData, isError, isLoading, progress } = useTopData({
    search_year: year,
  });

  return (
    <ContentLayout title="상위 캠페인">
      {isLoading ? (
        <Progress value={progress} className="w-full" />
      ) : (
        <>
          <TopCampaignsChart
            year={year}
            data={monthlyTopData}
            month={month}
            setMonth={setMonth}
            setYear={setYear}
          />
          <TopCampaignsTable data={monthlyTopData} month={month} />
        </>
      )}
    </ContentLayout>
  );
}
