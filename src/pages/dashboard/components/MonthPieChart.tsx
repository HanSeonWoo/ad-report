import { Cell, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { KWRformatter } from "@/lib/formatter";
import { MonthlyDataType } from "@/services/settlement";
import { useMemo } from "react";

type Props = {
  data: MonthlyDataType[];
};

export default function MonthPieChart({ data }: Props) {
  if (!data) return <div>No data available for selected month</div>;

  const pieData = useMemo(() => {
    return data
      .flatMap((month) => month.App.flatMap((app) => app.Campaign))
      .map((item) => ({ ...item, Revenue: Math.max(item.Revenue, 0) }));
  }, [data]);

  const chartConfig: ChartConfig = pieData.reduce((acc, item, index) => {
    acc[item.CampaignName] = {
      label: item.CampaignName,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="w-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />

          <Pie data={pieData} dataKey="Revenue" nameKey="CampaignName">
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(var(--chart-${index + 1}))`}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      {pieData.map((item, index) => {
        return (
          <div
            key={item.CampaignKey}
            className="flex flex-row items-center gap-2 mb-2"
          >
            <div
              className="size-4 rounded "
              style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
            />
            <p className="text-sm ">{item.CampaignName}</p>
            <p className="text-sm font-semibold">
              {KWRformatter.format(item.Revenue)}
            </p>
          </div>
        );
      })}
    </>
  );
}
