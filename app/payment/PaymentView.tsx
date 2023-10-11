import React from "react";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../mui/mui";

const paymentSummaries: Summary[] = [
  {
    percentage: 10,
    destination: "Education",
    address: "0xaE4D837cAA0C53579f8a156633355Df5058B02f3",
    toBePaid: 0.3,
    paid: 0.1,
  },
  {
    percentage: 30,
    destination: "Health Care",
    address: "0xaE4D837cAA0C53579f8a156633355Df5058B02f3",
    toBePaid: 0.5,
    paid: 0.1,
  },
  {
    percentage: 60,
    destination: "UE",
    address: "0xaE4D837cAA0C53579f8a156633355Df5058B02f3",
    toBePaid: 0.2,
    paid: 0.1,
  },
];
const PaymentView = () => {
  return (
    <Container sx={{ marginTop: "15px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Destination</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">To be paid</TableCell>
              <TableCell align="center">Paid</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentSummaries.map((row) => (
              <TableRow
                key={row.destination}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.destination}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.toBePaid}</TableCell>
                <TableCell align="center">{row.paid}</TableCell>
                <TableCell align="center">
                  <Button variant="contained">PAY</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PaymentView;
