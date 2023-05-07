import React from "react";
import { AddIcon, RemoveIcon, AddOutlinedIcon } from "../lib/mui-icons";
import { Box, IconButton, Paper, Typography } from "../lib/mui";

interface Props {
  name: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}
const TaxBeneficient = (props: Props) => {
  const { name, value, onIncrement, onDecrement } = props;

  return (
    <Paper component={Box} elevation={3}>
      <Typography variant="h6" align="center" padding="5px">
        {name}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "5px" }}>
        <IconButton onClick={onDecrement}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6" display="flex" alignItems="center">
          {value}%
        </Typography>
        <IconButton onClick={onIncrement}>
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TaxBeneficient;
