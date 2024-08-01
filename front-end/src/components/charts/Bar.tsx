import React from "react";
import { TrendingUp } from "lucide-react";
import {
  XAxis,
  BarChart,
  Bar as ReBar,
  YAxis,
  LabelList,
  CartesianGrid,
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
import { BinsData } from "@/app/page";

type Props = {
  data: BinsData[];
  title: string;
  color: string;
};

export default function Bar({ data, title,color }: Props) {
  const chartConfig = {
    count: {
      label: "count",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title} Distribution</CardTitle>
        <CardDescription>Based on Telco customers data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="overflow-hidden">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="range"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ReBar dataKey="count" fill={color} radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </ReBar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
