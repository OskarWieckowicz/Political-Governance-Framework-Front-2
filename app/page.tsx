import { getServerSession } from "next-auth";
import { Box, Button, Container, Paper, Stack, Typography } from "./mui/mui";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ArrowForward } from "./mui/mui-icons";
import styles from "./page.module.css";
import Link from "next/link";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const functionalities = [
    {
      title: "Documents",
      description:
        "Submit documents and invoices confirming your income and expenses.",
      link: "/documents",
    },
    {
      title: "Declaration",
      description:
        "Complete your tax return for the previous month, specifying your income and expenses.",
      link: "/declaration",
    },
    {
      title: "Tax Beneficiaries",
      description: "Get to know the institutions that receive your taxes.",
      link: "/tax-beneficiaries",
    },
    {
      title: "Payment",
      description: "Pay your taxes with ETH. You need Metamask wallet.",
      link: "/payment",
    },
  ];
  return (
    <Container>
      <Stack marginTop="20px" spacing={2} marginBottom="30px">
        <Typography variant="h3">Welcome !</Typography>
        <Typography variant="body1" paragraph>
          This project is for demonstration purposes only. The website you are
          on is a proposal for a new tax payment system. This application
          implements the Political Governance Framework - a tax payment system
          based on blockchain technology that introduces transparency in the
          budget of state bodies using public funds, making it easier to detect
          abuses and corruption of these bodies. As a payer, you are able to
          decide which sectors of public life will develop faster through the
          distribution of your taxes. To read more about Political Governance
          Framework go to white paper:{" "}
          <Typography
            component="a"
            href="https://presentation.political-governance-framework.com"
            target="_blank"
            sx={{ color: "#1976d2" }}
          >
            https://presentation.political-governance-framework.com
          </Typography>
        </Typography>
        <Typography variant="h4">Here are some core functionalities</Typography>
        {functionalities.map((functionality) => {
          return (
            <Box
              key={functionality.title}
              component={Paper}
              sx={{ padding: "10px", marginBottom: "15px" }}
            >
              <Link href={functionality.link}>
                <Button size="large" endIcon={<ArrowForward />}>
                  {functionality.title}
                </Button>
              </Link>
              <Typography variant="body1" marginLeft="10px">
                {functionality.description}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
}
