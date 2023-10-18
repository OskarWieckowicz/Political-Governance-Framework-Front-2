import React from "react";
import { Container, Stack, Typography } from "../mui/mui";
import Link from "next/link";
const DeclarationNotSubmittedView = () => {
  return (
    <Container>
      <Stack marginTop="20px" spacing={2}>
        <Typography variant="h3">One more step needed!</Typography>
        <Typography variant="body1">
          Before you will be able to pay your taxes you need to fill tax return
          delcaration, so we can calculate your obligations
          <Link href={"/declaration"}>
            <Typography sx={{ color: "blue", marginTop: "10px" }} variant="h5">
              Go to delcaration page
            </Typography>
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
};

export default DeclarationNotSubmittedView;
