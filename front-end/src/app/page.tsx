"use client";
import * as React from "react";
import Link from "next/link";
import {
  CircleDollarSign,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import Papa from "papaparse";
import CorrelationChart from "@/components/charts/Correlation";
import HorizontalBar from "@/components/charts/HorizontalBar";
import Bar from "@/components/charts/Bar";
import ChurnForm from "@/components/forms/ChurnForm";

export type CorrelationData = {
  feature: string;
  correlation: any;
};

export type BinsData = {
  range: string;
  count: number;
};

export type ChurnData = {
  name: string;
  count: number;
  fill: string;
};

export default function Dashboard() {
  const [churnCorrelation, setChurnCorrelation] = React.useState<
    CorrelationData[]
  >([]);
  const [totalChargesCorrelation, setTotalChargesCorrelation] = React.useState<
    CorrelationData[]
  >([]);
  const [churnBarChart, setChurnBarChart] = React.useState<ChurnData[]>([]);

  const [monthlyChargesData, setMonthlyChargesData] = React.useState<
    BinsData[]
  >([]);
  const [tenureData, setTenureData] = React.useState<BinsData[]>([]);

  React.useEffect(() => {
    // Fetch correlation data for churn
    fetch(
      "https://customer-churn-api-787c61128a7f.herokuapp.com/churn_correlation"
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.entries(data).map(([key, value]) => ({
          feature: key,
          correlation: value,
        }));
        setChurnCorrelation(formattedData);
      });

    // Fetch correlation data for total charges
    fetch(
      "https://customer-churn-api-787c61128a7f.herokuapp.com/total_charges_correlation"
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.entries(data).map(([key, value]) => ({
          feature: key,
          correlation: value,
        }));
        setTotalChargesCorrelation(formattedData);
      });
  }, [setChurnCorrelation, setTotalChargesCorrelation]);

  React.useEffect(() => {
    fetch("/Telco-Customer-Churn.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const results = Papa.parse(csvText, { header: true });
        const churnData = results.data;
        let churnCounts: any = { Yes: 0, No: 0 };

        churnData.forEach((row: any) => {
          if (row.Churn) {
            churnCounts[row.Churn] += 1;
          }
        });

        const chartData = [
          { name: "No Churn", count: churnCounts["No"], fill: "#289D8F" },
          { name: "Churn", count: churnCounts["Yes"], fill: "#E86E50" },
        ];

        setChurnBarChart(chartData);
      })
      .catch((error) => {
        console.error("Error fetching the CSV file: ", error);
      });
  }, []);

  React.useEffect(() => {
    fetch("/Telco-Customer-Churn.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const results = Papa.parse(csvText, { header: true });
        const data = results.data;

        // Binning for MonthlyCharges
        let monthlyChargesBins = Array.from({ length: 10 }, (_, i) => ({
          range: `${i * 10}-${(i + 1) * 10}`,
          count: 0,
        }));
        data.forEach((row: any) => {
          if (row.MonthlyCharges) {
            let charge = parseFloat(row.MonthlyCharges);
            let index = Math.floor(charge / 10);
            if (index >= 0 && index < monthlyChargesBins.length) {
              monthlyChargesBins[index].count += 1;
            }
          }
        });

        // Binning for Tenure
        let tenureBins = Array.from({ length: 10 }, (_, i) => ({
          range: `${i * 6}-${(i + 1) * 6}`,
          count: 0,
        }));
        data.forEach((row: any) => {
          if (row.tenure) {
            let tenure = parseInt(row.tenure, 10);
            let index = Math.floor(tenure / 6);
            if (index >= 0 && index < tenureBins.length) {
              tenureBins[index].count += 1;
            }
          }
        });

        setMonthlyChargesData(monthlyChargesBins);
        setTenureData(tenureBins);
      })
      .catch((error) => console.error("Error fetching the CSV file: ", error));
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/churn"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Churn</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Churn</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/total-charges"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <CircleDollarSign className="h-5 w-5" />
                <span className="sr-only">TotalCharges</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Total Charges</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
                <Link
                  href="/churn"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Churn
                </Link>
                <Link
                  href="/total-charges"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <CircleDollarSign className="h-5 w-5" />
                  Total Charges
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-8" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription className="text-balance max-w-lg leading-relaxed">
                    Get insights from Telco customers data to improve your
                    business. Analyze churn, total charges, monthly charges, and
                    tenure.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="gap-2">
                  <Link href="/churn">
                    <Button className="max-sm:text-xs">Customer Churn</Button>
                  </Link>
                  <Link href="/total-charges">
                    <Button className="max-sm:text-xs">
                      Customer Total Charges
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            {/*  */}
            <CorrelationChart data={churnCorrelation} title="Churn" />
            <CorrelationChart
              data={totalChargesCorrelation}
              title="Total Charges"
            />
            <Bar
              data={monthlyChargesData}
              title="Monthly Charges"
              color="#8884d8"
            />
            <Bar data={tenureData} title="Tenure" color="#82ca9d" />
            <HorizontalBar data={churnBarChart} title="Churn" />
          </div>
        </main>
      </div>
    </div>
  );
}
