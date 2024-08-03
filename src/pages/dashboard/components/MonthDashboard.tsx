import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RESULT_TYPES } from "@/lib/const";
import { KWRformatter, Numberformatter } from "@/lib/formatter";
import { getLabel } from "@/lib/getLabel";
import { AdSettlementResponseType } from "@/services/settlement";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import MonthPieChart from "./MonthPieChart";
import MonthTable from "./MonthTable";

const iconMap = {
  Revenue: DollarSign,
  Commission: CreditCard,
  Complete: Users,
  RevenuePerComplete: Activity,
} as const;

type Props = {
  data: AdSettlementResponseType;
};
export default function MonthDashboard({ data }: Props) {
  const chunkData = useMemo(() => {
    return RESULT_TYPES.map((type) => ({
      type,
      Icon: iconMap[type],
      formatter: type === "Complete" ? Numberformatter : KWRformatter,
      value:
        type !== "RevenuePerComplete"
          ? data.Payment[type]
          : Number(data.Payment.Revenue / data.Payment.Complete),
    }));
  }, [data]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {chunkData.map(({ formatter, type, value, Icon }, index) => (
            <Card key={`chunk-${index}`} x-chunk={`chunk-${index}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {getLabel(type)}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatter.format(value)}
                </div>
                <p className="text-xs text-muted-foreground">{type}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>캠페인 성과 차트</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to={"/top"}>더보기</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <MonthPieChart data={data.Payment.Monthly} />
            </CardContent>
          </Card>

          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>캠페인 성과 표</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <MonthTable data={data.Payment.Monthly} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
