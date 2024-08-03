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

import ResultTypeSelector from "@/components/ResultTypeSelector";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { YEARS } from "@/lib/const";
import { getLabel } from "@/lib/getLabel";
import { ResultType } from "@/lib/type";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useDynamicChartConfig } from "../hooks/useDynamicChartConfig";
import { MonthYearDataType } from "../hooks/useMonthData";

type Props = {
  data: MonthYearDataType[];
  resultType: ResultType;
  onSelect: (type: ResultType) => void;
};

export default function MonthlyChart({ data, onSelect, resultType }: Props) {
  const { sortedSelectedYears, toggleYear } = useSortedSelectedYears();
  const chartConfig = useDynamicChartConfig(data);

  return (
    <Card>
      <div className="px-4 flex flex-row justify-between items-center">
        <CardHeader>
          <CardTitle>월별 {getLabel(resultType)}</CardTitle>
        </CardHeader>
        <div className="p-4 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <ResultTypeSelector resultType={resultType} onSelect={onSelect} />

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

      <CardContent className="">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[600px]">
          <BarChart accessibilityLayer data={data}>
            <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <XAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(_, index) => index + 1 + "월"}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent labelKey="month" indicator="dashed" />
              }
            />
            {sortedSelectedYears.map((year) => (
              <Bar
                key={year}
                dataKey={year}
                fill={`var(--color-${year})`}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
