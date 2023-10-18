import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../mui/mui";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Payment } from "../models/Payment";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import { Profile } from "../models/Profile";

async function getProfile(session): Promise<Profile> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
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

const contractABI = [
  {
    constant: false,
    inputs: [
      {
        name: "taxIdentifier",
        type: "string",
      },
    ],
    name: "pay",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
];

async function getData(session): Promise<Payment[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments`, {
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
const weiToEth = (wei) => {
  const ethValue = wei / 1e18;
  return ethValue.toFixed(4);
};

const payTax = async (
  session,
  toBePaidInWei: bigint,
  contractAddress: string
) => {
  const profile = await getProfile(session);
  const provider = new ethers.BrowserProvider(window.ethereum);

  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.pay(profile.taxId, {
      value: toBePaidInWei,
    });

    await tx.wait();
    console.log("Payment successful");
  } catch (error) {
    console.error("Payment failed:", error);
  }
};

const PaymentView = () => {
  const [payments, setPayments] = useState<Payment[]>();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  const refreshPayments = async () => {
    if (session) {
      try {
        const response = await getData(session);
        setPayments(response);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    }
  };

  useEffect(() => {
    refreshPayments();

    const intervalId = setInterval(() => {
      refreshPayments();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [session]);

  if (!payments) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ marginTop: "15px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Destination</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">To be paid [ETH]</TableCell>
              <TableCell align="center">Paid [ETH]</TableCell>
              <TableCell align="center">Left to pay [ETH]</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.map((row) => (
              <TableRow
                key={row.destination}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.destination}</TableCell>
                <TableCell align="center">{row.contractAddress}</TableCell>
                <TableCell align="center">{weiToEth(row.toBePaid)}</TableCell>
                <TableCell align="center">{weiToEth(row.paid)}</TableCell>
                <TableCell align="center">{weiToEth(row.leftToPay)}</TableCell>
                <TableCell align="center">
                  <Button
                    disabled={row.leftToPay == BigInt(0)}
                    onClick={() =>
                      payTax(session, row.leftToPay, row.contractAddress)
                    }
                    variant="contained"
                  >
                    PAY
                  </Button>
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
