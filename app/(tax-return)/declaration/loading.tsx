import { Container, Skeleton } from "@/app/mui/mui";
import React from "react";

const DeclarationLoader = () => {
  return (
    <Container>
      <Skeleton variant="rectangular" height={366} />
    </Container>
  );
};

export default DeclarationLoader;
