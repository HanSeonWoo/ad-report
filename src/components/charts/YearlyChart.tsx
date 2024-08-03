import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { YearData } from "@/pages/YearlyPage";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { getLabel } from "../tables/YearlyTable";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const chartConfig = {
  Revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  Commission: {
    label: "Commission",
    color: "hsl(var(--chart-2))",
  },
  Complete: {
    label: "Complete",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type ChartType = keyof typeof chartConfig;
const CHART_KEYS = Object.keys(chartConfig) as ChartType[];

export default function YearlyChart({ data }: { data: YearData[] }) {
  const [chartKey, setChartKey] = useState<ChartType>("Revenue");
  if (!data) {
    return null;
  }

  return (
    <Card>
      <div className="px-4 flex flex-row justify-between items-center">
        <CardHeader>
          <CardTitle>연도별 {getLabel(chartKey)}</CardTitle>
          <CardDescription>
            {data[0].year} - {data.at(-1)?.year}
          </CardDescription>
        </CardHeader>
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {getLabel(chartKey)}{" "}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {CHART_KEYS.map((ck) => {
                return (
                  <DropdownMenuItem
                    key={ck}
                    className="capitalize"
                    onSelect={() => setChartKey(ck)}
                  >
                    {getLabel(ck)}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
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
              dataKey={chartKey}
              fill={`var(--color-${chartKey})`}
              radius={4}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
