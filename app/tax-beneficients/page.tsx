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

const cards = [
  {
    name: "Education",
    description:
      "Support public education initiatives and programs aimed at providing quality education to students.",
    img: "/education.jpg",
  },
  {
    name: "Health Care",
    description:
      "Contribute to public healthcare services and initiatives that improve access to medical care and promote well-being.",
    img: "/health-care.jpg",
  },
  {
    name: "European Union",
    description:
      "Show your support for the European Union and its efforts towards economic integration, peace, and cooperation among member countries.",
    img: "/eu.jpg",
  },
  {
    name: "Army",
    description:
      " Contribute to the defense and security of the nation by supporting the armed forces and their missions.",
    img: "/army.jpg",
  },
  {
    name: "Ministry of Infrastructure",
    description:
      "Support the development and maintenance of national infrastructure projects, such as roads, bridges, and public transportation systems.",
    img: "/infrastructure.jpg",
  },
];
const TaxBeneficientsPage = () => {
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
        {/* End hero unit */}
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
                  <Rating name="half-rating" defaultValue={0} precision={0.5} />
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
