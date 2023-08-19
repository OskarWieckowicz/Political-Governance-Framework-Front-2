import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../mui/mui";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface History {
  billingPeriod: string;
  revenue: number;
  expense: number;
  income: number;
  taxes: number;
}
async function getData() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.BACKEND_URL}/declaration/history`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const HistoryPage = async () => {
  const rows: History[] = await getData();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Billing period</TableCell>
            <TableCell align="center">Revenue</TableCell>
            <TableCell align="center">Expense</TableCell>
            <TableCell align="center">Income</TableCell>
            <TableCell align="center">Taxes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.billingPeriod}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.billingPeriod}
              </TableCell>
              <TableCell align="center">{row.revenue}</TableCell>
              <TableCell align="center">{row.expense}</TableCell>
              <TableCell align="center">{row.income}</TableCell>
              <TableCell align="center">{row.taxes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryPage;
