import { Container, Skeleton } from "@/app/mui/mui";
import React from "react";

const BeneficiaryDetailsLoader = () => {
  return (
    <Container>
      <Skeleton variant="rectangular" height={700} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Container>
  );
};

export default BeneficiaryDetailsLoader;
