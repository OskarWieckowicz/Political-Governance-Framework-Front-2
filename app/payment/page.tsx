import { Box, Container, Stack } from "../lib/mui";
import React from "react";
import TaxBeneficientPayment from "./TaxBeneficientPayment";

interface Summary {
  name: string;
  value: number;
  address: string;
}

const PaymentPage = () => {
  const paymentSummaries: Summary[] = [
    {
      name: "Education",
      value: 0.3,
      address: "0x13ikjfio131ji1o13i41i14j",
    },
    {
      name: "Health Care",
      value: 0.5,
      address: "0x23ikjfio1ad1o13i41i14a",
    },
    {
      name: "UE",
      value: 0.2,
      address: "0x413ikjfio1ado13i41i14x",
    },
  ];
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} marginTop="30px">
        {paymentSummaries.map((summary) => (
          <TaxBeneficientPayment
            key={summary.name}
            name={summary.name}
            value={summary.value}
            address={summary.address}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default PaymentPage;
