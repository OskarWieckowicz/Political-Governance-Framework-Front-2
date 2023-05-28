import { Box, Container, Stack, Typography } from "./mui/mui";

export default function Home() {
  return (
    <Container>
      <Stack marginTop="20px" spacing={2}>
        <Typography variant="h3">Welcome !</Typography>
        <Typography variant="body1">
          You are in the tax service. Here you will submit your tax declaration
          and pay your liabilities. You decide where your money goes
        </Typography>
      </Stack>
    </Container>
  );
}
