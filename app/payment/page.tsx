"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "../mui/mui";
import { RemoveIcon, AddIcon } from "../mui/mui-icons";
interface Summary {
  percentage: number;
  destination: string;
  address: string;
  value: number;
  paid: number;
}

const PaymentPage = () => {
  const paymentSummaries: Summary[] = [
    {
      percentage: 20,
      destination: "Education",
      address: "0xaE4D837cAA0C53579f8a156633355Df5058B02f3",
      value: 0.3,
      paid: 0.1,
    },
    {
      percentage: 20,
      destination: "Health Care",
      address: "0xaE4D837cAA0C53579f8a156633355Df5058B02f3",
      value: 0.5,
      paid: 0.1,
    },
    {
      percentage: 20,
      destination: "UE",
      address: "0xaE4D837cAA0C53579f8a156633355Df5058B02f3",
      value: 0.2,
      paid: 0.1,
    },
  ];

  const onDecrement = () => {
    console.log("minus");
  };
  const onIncrement = () => {
    console.log("plus");
  };
  return (
    <Container sx={{ marginTop: "15px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Percentage</TableCell>
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
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <IconButton onClick={onDecrement}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      variant="body1"
                      display="flex"
                      alignItems="center"
                    >
                      {row.percentage}
                    </Typography>
                    <IconButton onClick={onIncrement}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="center">{row.destination}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.paid}</TableCell>
                <TableCell align="center">
                  <Button variant="contained">PAY</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: "#b7f5a4",
              }}
            >
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <Typography variant="h6" display="flex" alignItems="center">
                    100
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <Typography variant="h6" display="flex" alignItems="center">
                    1.35
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <Typography variant="h6" display="flex" alignItems="center">
                    0.4
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PaymentPage;
