import { getServerSession } from "next-auth";
import { Box, Container, Stack, Typography } from "./mui/mui";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/api/auth/signin");
  }
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
