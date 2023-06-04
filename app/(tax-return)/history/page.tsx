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

const rows = [
  createData("05.2020", 1200, 213, 24, 5),
  createData("06.2020", 3000, 112, 24, 3),
  createData("07.2020", 1501, 123, 24, 2),
  createData("08.2020", 4514, 133, 24, 1),
  createData("09.2020", 12331, 123, 24, 3),
];

const HistoryPage = () => {
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
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
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
