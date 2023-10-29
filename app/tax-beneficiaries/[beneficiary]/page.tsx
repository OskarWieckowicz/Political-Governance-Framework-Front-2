import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from "../../mui/mui";
import CashFlowChart from "./ChashFlowChart";
import SatisfactionChart from "./SatisfactionChart";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { BeneficiaryDetails } from "@/app/models/BeneficiaryDetails";
import { weiToEth } from "@/app/utils/converters";

const getData = async (params) => {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.BACKEND_URL}/taxBeneficiaries/details/${params.beneficiary}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const BeneficiaryPage = async ({ params }) => {
  const beneficiary: BeneficiaryDetails = await getData(params);
  return (
    <Container sx={{ padding: "15px" }}>
      <Card>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image={beneficiary.image}
          title="organization image"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h3" component="h2">
            {beneficiary.name}
          </Typography>
          <Typography>{beneficiary.description}</Typography>
          <Container maxWidth="md" sx={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Official site:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Link href={beneficiary.site} underline="none" target="_blank">
                  {beneficiary.site}
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Board members:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{beneficiary.leader}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Smart contract:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Link
                  href={`${process.env.NEXT_ETHERSCAN_URL}${beneficiary.smartContractAddress}`}
                  underline="none"
                  target="_blank"
                >
                  {beneficiary.smartContractAddress}
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>Balance:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{weiToEth(beneficiary.balance)} ETH</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Citizens satisfaction:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{beneficiary.rating} / 5</Typography>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="md" sx={{ marginTop: "20px" }}>
            <Typography variant="h5" align="center" marginTop="30px">
              Cash flow
            </Typography>
            <CashFlowChart />
            <Typography variant="h5" align="center" marginTop="30px">
              Citizens satisfaction
            </Typography>
            <SatisfactionChart />
          </Container>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BeneficiaryPage;
