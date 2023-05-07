import React from "react";
import { Box, Button, Paper, Stack, Typography } from "../lib/mui";

interface Props {
  name: string;
  value: number;
  address: string;
}
const TaxBeneficientPayment = (props: Props) => {
  return (
    <Paper
      component={Box}
      elevation={3}
      display="flex"
      justifyContent="space-between"
    >
      <Typography variant="p" display="flex" alignItems="center" padding="5px">
        {props.name}
      </Typography>
      <Typography variant="p" display="flex" alignItems="center" padding="5px">
        {props.value} ETH
      </Typography>
      <Typography variant="p" display="flex" alignItems="center" padding="5px">
        {props.address}
      </Typography>
      <Stack padding="5px">
        <Button size="small" variant="contained">
          pay
        </Button>
      </Stack>
    </Paper>
  );
};

export default TaxBeneficientPayment;
