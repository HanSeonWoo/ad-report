import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useSortedSelectedYears } from "../hooks/useSortedSelectedYear";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useDynamicChartConfig } from "../hooks/useDynamicChartConfig";
import { MonthData } from "../hooks/useMonthData";
import { YEARS } from "@/hooks/useGetAllData";

export default function MonthlyChart({ data }: { data: MonthData[] }) {
  const { sortedSelectedYears, toggleYear } = useSortedSelectedYears();
  const chartConfig = useDynamicChartConfig(data);
  return (
    <Card>
      <div className="px-4 flex flex-row justify-between items-center">
        <CardHeader>
          <CardTitle>월별 광고 수익 비교</CardTitle>
        </CardHeader>
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                연도 선택
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {YEARS.map((year) => (
                <DropdownMenuCheckboxItem
                  key={year}
                  className="capitalize"
                  checked={sortedSelectedYears.includes(year)}
                  onCheckedChange={() => toggleYear(year)}
                >
                  {year}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {sortedSelectedYears.map((year, index) => (
              <Bar
                key={year}
                dataKey={year}
                fill={`var(--color-${year})`}
                radius={4}
              >
                <LabelList position="top" offset={12} fontSize={9}>
                  {year.toString().slice(2, 4)}
                </LabelList>
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
