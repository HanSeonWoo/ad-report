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

export default function YearlyChart({ data }: { data: YearData[] }) {
  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>연도별 총수익</CardTitle>
        <CardDescription>
          {data[0].year} - {data.at(-1)?.year}
        </CardDescription>
      </CardHeader>
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

            <Bar dataKey="Revenue" fill="var(--color-Revenue)" radius={4}></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
