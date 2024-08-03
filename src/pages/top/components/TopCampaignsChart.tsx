import { AlertCircle, TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
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
import { COLORS } from "@/lib/colors";
import { MonthlyTopDataType } from "../hooks/useTopData";
import PeriodeSelector from "../../../components/PeriodeSelector";

export default function TopCampaignsChart({
  data,
  year,
  month,
  setMonth,
  setYear,
}: {
  data: MonthlyTopDataType[];
  year: number;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}) {
  const currentMonthData = data.find((item) => item.month === month);

  if (!currentMonthData) return <div>No data available for selected month</div>;

  const isNegativeRevenue = currentMonthData.totalRevenue < 0;

  const chartConfig: ChartConfig = currentMonthData.topData.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    },
    {} as ChartConfig
  );

  return (
    <Card className="flex flex-col">
      <div className="flex flex-row justify-between px-4">
        <CardHeader className="items-center pb-0">
          <CardTitle>Top Campaigns</CardTitle>
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
                data={currentMonthData.topData}
                dataKey="revenue"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {currentMonthData.topData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Revenue: {currentMonthData.totalRevenue.toLocaleString()}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top campaigns for{" "}
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
