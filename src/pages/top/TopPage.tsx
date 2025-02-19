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
  const { monthlyTopData, isLoading, progress } = useTopData({
    search_year: year,
  });

  return (
    <ContentLayout title="상위 캠페인">
      {isLoading ? (
        <Progress value={progress} className="w-full" />
      ) : (
        <>
          <TopCampaignsChart
            data={monthlyTopData[month - 1]}
            year={year}
            month={month}
            setMonth={setMonth}
            setYear={setYear}
          />
          <TopCampaignsTable data={monthlyTopData[month - 1]} />
        </>
      )}
    </ContentLayout>
  );
}
