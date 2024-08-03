import { AlertCircle, TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import PeriodeSelector from "../../../components/PeriodeSelector";
import { MonthlyTopDataType } from "../hooks/useTopData";

export default function TopCampaignsChart({
  data,
  year,
  month,
  setMonth,
  setYear,
}: {
  data: MonthlyTopDataType;
  year: number;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}) {
  if (!data) return <div>No data available for selected month</div>;

  const isNegativeRevenue = data.totalRevenue < 0;

  const chartConfig: ChartConfig = data.topData.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col">
      <div className="flex flex-row justify-between px-4">
        <CardHeader>
          <CardTitle>상위 캠페인 차트</CardTitle>
          <CardDescription>
            {year}년 {month}월
          </CardDescription>
        </CardHeader>
        <div className="p-4">
          <PeriodeSelector
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
          />
        </div>
      </div>
      <CardContent className="flex-1 pb-0">
        {isNegativeRevenue ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Positive Revenue Data
              </h3>
              <p className="text-gray-600">
                This month shows a net loss. Please check the detailed breakdown
                below.
              </p>
            </div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="w-full max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={data.topData}
                dataKey="revenue"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.topData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--chart-${index + 1}))`}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Revenue: {data.totalRevenue.toLocaleString()}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
