import React from "react";
import {
  XAxis,
  BarChart,
  Bar as ReBar,
  YAxis,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type Props = {
  data: { name: string; count: number; fill: string }[];
  title: string;
};

export default function HorizontalBar({ data, title }: Props) {
  const chartConfig = {
    count: {
      label: "count",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="overflow-hidden">
          Bar Chart for <span className="font-extrabold">{title}</span>
        </CardTitle>
        <CardDescription>Based on Telco customers data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="overflow-hidden">
          <BarChart accessibilityLayer data={data} layout="vertical">
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={8}
              fontSize={14}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ReBar dataKey="count" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
            Churn Rate: {" "}
          {
            parseFloat(
                (
                    (data.find((item) => item.name === "Churn")?.count ?? 1) /
                    (data.find((item) => item.name === "No Churn")?.count ?? 1) * 100
                ).toFixed(2)
            )
          } %{" "}
        </div>
        <div className="leading-none text-muted-foreground">
            Churn rate is calculated based on the number of customers who churned
        </div>
      </CardFooter>
    </Card>
  );
}
