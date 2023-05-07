"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "../lib/mui";
import TaxBeneficient from "./TaxBeneficient";
const TaxesDashboard = () => {
  const [education, setEducation] = useState(30);
  const [healthCare, setHealthCare] = useState(50);
  const [ue, setUE] = useState(20);
  const router = useRouter();

  const total = education + healthCare + ue;

  const handleIncrement = (setter) => {
    if (total < 100) {
      setter((prevValue) => prevValue + 1);
    }
  };

  const handleDecrement = (setter) => {
    if (total > 0) {
      setter((prevValue) => prevValue - 1);
    }
  };

  function handleSubmit(event): void {
    event.preventDefault();
    console.log("submited");
    router.push("/payment");
  }
  return (
    <Box>
      <Typography align="center" variant="h6" marginBottom="10px">
        {total}%
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <TaxBeneficient
          name="Education"
          value={education}
          onIncrement={() => handleIncrement(setEducation)}
          onDecrement={() => handleDecrement(setEducation)}
        />
        <TaxBeneficient
          name="Health Care"
          value={healthCare}
          onIncrement={() => handleIncrement(setHealthCare)}
          onDecrement={() => handleDecrement(setHealthCare)}
        />
        <TaxBeneficient
          name="UE"
          value={ue}
          onIncrement={() => handleIncrement(setUE)}
          onDecrement={() => handleDecrement(setUE)}
        />
      </Box>
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          sx={{ height: 40 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TaxesDashboard;
