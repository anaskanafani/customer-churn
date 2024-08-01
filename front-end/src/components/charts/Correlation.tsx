import { TrendingUp } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  LabelList,
  YAxis,
  XAxis,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CorrelationData } from "@/app/page";

type Props = { data: CorrelationData[]; title: string };

const CorrelationChart = ({ data, title }: Props) => {
  const chartConfig = {
    correlation: {
      label: "Correlation",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Correlation chart between{" "}
          <span className="font-extrabold">{title}</span> and other features
        </CardTitle>
        <CardDescription>Based on Telco customers data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="overflow-hidden">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="dashed" />
              }
            />
            <XAxis dataKey="feature" type="category" hide />

            <Bar dataKey="correlation" radius={8}>
              <LabelList
              className="max-lg:hidden"
                position="top"
                dataKey="feature"
                fillOpacity={1}
                fontSize={10}
              />
              {data.map((item) => (
                <Cell
                  key={item.feature}
                  fill={item.correlation > 0 ? "#34d399" : "#f87171"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CorrelationChart;
