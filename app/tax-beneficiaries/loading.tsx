import React from "react";
import { Box, Container, Grid, Skeleton } from "../mui/mui";

const TaxBeneficiaryLoader = () => {
  const skeletonCards = new Array(6).fill(null);

  return (
    <Box>
      <Container maxWidth="sm">
        <Skeleton sx={{ marginTop: "10px" }} variant="text" />
        <Skeleton variant="text" />
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {skeletonCards.map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TaxBeneficiaryLoader;
