import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import ResultTypeSelector from "@/components/ResultTypeSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getLabel } from "@/lib/getLabel";
import { ResultType } from "@/lib/type";
import { useState } from "react";
import { YearData } from "../hooks/useYearlyData";
import { RESULT_TYPES } from "@/lib/const";

const chartConfig = RESULT_TYPES.reduce((config, type, index) => {
  config[type] = {
    label: type,
    color: `hsl(var(--chart-${index + 1}))`,
  };
  return config;
}, {} as ChartConfig);

export default function YearlyChart({ data }: { data: YearData[] }) {
  const [resultType, setResultType] = useState<ResultType>("Revenue");
  if (!data) {
    return null;
  }

  return (
    <Card>
      <div className="px-4 flex flex-row justify-between items-center">
        <CardHeader>
          <CardTitle>연도별 {getLabel(resultType)}</CardTitle>
          <CardDescription>
            {data[0].year} - {data[data.length - 1].year}
          </CardDescription>
        </CardHeader>
        <div className="p-4">
          <ResultTypeSelector
            onSelect={setResultType}
            resultType={resultType}
          />
        </div>
      </div>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => String(value).slice(-2)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar
              dataKey={resultType}
              fill={`var(--color-${resultType})`}
              radius={4}
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
