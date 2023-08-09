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
  Rating,
  Typography,
} from "../mui/mui";
import Link from "next/link";

interface TaxBeneficiary {
  name: string;
  description: string;
  img: string;
  rating: number;
}
async function getData() {
  const res = await fetch(`${process.env.BACKEND_URL}/taxBeneficiaries`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const TaxBeneficientsPage = async () => {
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
          Tax Beneficients
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Below are all public organizations and ministries you can support with
          your taxes.
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
                  image={card.img}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.name}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Link href={"/tax-beneficients/" + card.name}>
                    <Button size="small">View more</Button>
                  </Link>
                  <Rating
                    name="half-rating"
                    defaultValue={card.rating}
                    precision={0.5}
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

export default TaxBeneficientsPage;
