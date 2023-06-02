"use client";
import React from "react";
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
} from "recharts";
function createData(date: string, rating: number) {
  return { date, rating };
}

const data = [
  //   {
  //     date: "07.2022",
  //     rating: 2.9,
  //   },
  //   {
  //     date: "08.2022",
  //     rating: 2.9,
  //   },
  //   {
  //     date: "09.2022",
  //     rating: 2.9,
  //   },
  //   {
  //     date: "10.2022",
  //     rating: 2.9,
  //   },
  //   {
  //     date: "11.2022",
  //     rating: 2.81,
  //   },
  //   {
  //     date: "12.2022",
  //     rating: 2.23,
  //   },
  {
    date: "01.2023",
    rating: 3.09,
  },
  {
    date: "02.2023",
    rating: 0.98,
  },
  {
    date: "03.2023",
    rating: 4.25,
  },
  {
    date: "04.2023",
    rating: 4.69,
  },
  {
    date: "05.2023",
    rating: 3.69,
  },
  {
    date: "06.2023",
    rating: 4.11,
  },
];

const SatisfactionChart = () => {
  const theme = useTheme();
  return (
    <BarChart
      width={800}
      height={400}
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
      <YAxis style={theme.typography.body2} domain={[0, 5]} tickCount={6}>
        <Label
          value={"Rating"}
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
      <Bar dataKey="rating" fill="#8884d8" />
    </BarChart>
  );
};

export default SatisfactionChart;
