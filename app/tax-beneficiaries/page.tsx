import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "../mui/mui";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { TaxBeneficiary } from "../models/TaxBeneficiary";
import RatingComponent from "./RatingComponent";

async function getData() {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.BACKEND_URL}/taxBeneficiaries`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TaxBeneficiariesPage = async () => {
  const cards: TaxBeneficiary[] = await getData();

  return (
    <Box>
      <Container maxWidth="sm">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          marginTop="10px"
        >
          Tax Beneficiaries
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Below are all public organizations and ministries you can support with
          your taxes. Once a month, you can assess your satisfaction with the
          work of individual institutions.
        </Typography>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card.name} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={card.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Link href={"/tax-beneficiaries/" + card.name}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                  </Link>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Link href={"/tax-beneficiaries/" + card.name}>
                    <Button size="small">View more</Button>
                  </Link>
                  <RatingComponent
                    rating={card.rating}
                    taxBeneficiaryId={card.id}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TaxBeneficiariesPage;
