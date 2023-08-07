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
function createData(
  date: string,
  revenue: number,
  expense: number,
  income: number,
  taxes: number
) {
  return { date, revenue, expense, income, taxes };
}

interface History {
  billingPeriod: string;
  revenue: number;
  expense: number;
  income: number;
  taxes: number;
}
async function getData() {
  const res = await fetch("http://localhost:8080/declaration/history", {
    cache: "no-store",
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
