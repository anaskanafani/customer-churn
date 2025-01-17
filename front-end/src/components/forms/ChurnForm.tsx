"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ReloadIcon } from "@radix-ui/react-icons";
import Modal from "../ui/Modal";

type Props = {};

const formSchema = z.object({
  SeniorCitizen: z.number(),
  Partner: z.number(),
  Dependents: z.number(),
  tenure: z.coerce.number().int(),
  OnlineSecurity: z.number(),
  OnlineBackup: z.number(),
  DeviceProtection: z.number(),
  TechSupport: z.number(),
  Contract: z.number(),
  PaperlessBilling: z.number(),
  PaymentMethod: z.number(),
  MonthlyCharges: z.coerce.number(),
  TotalCharges: z.coerce.number(),
});

const formData = [
  {
    label: "Monthly Charges",
    value: "MonthlyCharges",
  },
  {
    label: "Total Charges",
    value: "TotalCharges",
  },
  {
    label: "Tenure",
    value: "tenure",
  },
  {
    label: "Senior Citizen",
    value: "SeniorCitizen",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Partner",
    value: "Partner",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Dependents",
    value: "Dependents",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Paperless Billing",
    value: "PaperlessBilling",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Online Security",
    value: "OnlineSecurity",
    options: [
      { label: "No internet", value: 1 },
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Online Backup",
    value: "OnlineBackup",
    options: [
      { label: "No internet", value: 1 },
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Device Protection",
    value: "DeviceProtection",
    options: [
      { label: "No internet", value: 1 },
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Tech Support",
    value: "TechSupport",
    options: [
      { label: "No internet service", value: 1 },
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    label: "Contract",
    value: "Contract",
    options: [
      { label: "Two year", value: 2 },
      { label: "One year", value: 1 },
      { label: "Month-to-month", value: 0 },
    ],
  },
  {
    label: "Payment Method",
    value: "PaymentMethod",
    options: [
      { label: "Bank transfer", value: 0 },
      { label: "Credit card", value: 1 },
      { label: "Electronic check", value: 2 },
      { label: "Mailed check", value: 3 },
    ],
  },
];

const ChurnForm = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(
      "https://customer-churn-api-787c61128a7f.herokuapp.com/classify-churn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setResult(data.prediction);
        setOpen(true);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <Form {...form}>
      <Modal
        open={open}
        setOpen={setOpen}
        content={`The customer will ${result.toLowerCase()}`}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Customer Churn</CardTitle>
            <CardDescription>Enter customer details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="max-sm:text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1 sm:w-[200px]">Feature</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.map(
                  (item: {
                    label: string;
                    value: string;
                    options?: { label: string; value: number }[];
                  }) => (
                    <TableRow key={item.value}>
                      <TableCell className="font-semibold ">
                        {item.label}
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={item.value as any}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                {item.options ? (
                                  <ToggleGroup
                                    onValueChange={(value) =>
                                      field.onChange(Number(value))
                                    }
                                    value={String(field.value)}
                                    className="justify-start"
                                    type="single"
                                    variant="outline"
                                  >
                                    {item.options.map((option) => (
                                      <ToggleGroupItem
                                        key={option.value}
                                        value={String(option.value)}
                                        className="max-sm:text-xs max-sm:w-28"
                                      >
                                        {option.label}
                                      </ToggleGroupItem>
                                    ))}
                                  </ToggleGroup>
                                ) : (
                                  <Input type="number" {...field} />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="px-7">
            {form.formState.isSubmitting ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">Get Churn Prediction</Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ChurnForm;
