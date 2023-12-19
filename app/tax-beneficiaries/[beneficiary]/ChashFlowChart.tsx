"use client";
import React, { useId } from "react";
import { useTheme } from "@mui/material/styles";
import {
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function createData(
  date: string,
  income: number,
  outcome: number,
  balance: number
) {
  return { date, income, outcome, balance };
}

const data = [
  // {
  //   date: "07.2022",
  //   income: 1200,
  //   outcome: 300,
  //   balance: 1313,
  // },
  // {
  //   date: "08.2022",
  //   income: 1200,
  //   outcome: 300,
  //   balance: 1313,
  // },
  // {
  //   date: "09.2022",
  //   income: 1200,
  //   outcome: 300,
  //   balance: 1313,
  // },
  // {
  //   date: "10.2022",
  //   income: 1200,
  //   outcome: 300,
  //   balance: 1313,
  // },
  // {
  //   date: "11.2022",
  //   income: 1400,
  //   outcome: 500,
  //   balance: 1213,
  // },
  // {
  //   date: "12.2022",
  //   income: 2200,
  //   outcome: 1100,
  //   balance: 6313,
  // },
  {
    date: "01.2023",
    income: 320,
    outcome: 1100,
    balance: 329,
  },
  {
    date: "02.2023",
    income: 100,
    outcome: 300,
    balance: 313,
  },
  {
    date: "03.2023",
    income: 900,
    outcome: 800,
    balance: 7313,
  },
  {
    date: "04.2023",
    income: 900,
    outcome: 800,
    balance: 2313,
  },
  {
    date: "05.2023",
    income: 1900,
    outcome: 2800,
    balance: 5313,
  },
  {
    date: "06.2023",
    income: 1900,
    outcome: 5800,
    balance: 313,
  },
];
const CashFlowChart = () => {
  // const chartId = useId();
  const theme = useTheme();

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minWidth="300px"
      minHeight="400px"
      id="responsiveCashFlowChartContainer"
    >
      <BarChart
        id="cashflowChart"
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" style={theme.typography.body2} />
        <YAxis style={theme.typography.body2}>
          <Label
            value={"ETH"}
            angle={270}
            position="left"
            style={{
              textAnchor: "middle",
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#32a852" />
        <Bar dataKey="outcome" fill="#b03854" />
        <Bar dataKey="balance" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CashFlowChart;
