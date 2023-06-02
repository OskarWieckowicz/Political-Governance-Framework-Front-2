import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "../../mui/mui";
import CashFlowChart from "./ChashFlowChart";
import SatisfactionChart from "./SatisfactionChart";

const BeneficientPage = ({ params }) => {
  return (
    <Container sx={{ padding: "15px" }}>
      <Card>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image="/eu.jpg"
          title="green iguana"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h3" component="h2">
            European Union
          </Typography>
          <Typography>
            The main and central goal of EU development cooperation is the
            eradication of poverty in the context of sustainable development,
            including the pursuit of the 2030 Agenda for Sustainable Development
            and its Sustainable Development Goals (SDGs) adopted in 2015 by the
            United Nations. The EU, together with its Member States, is the
            largest donor of Official Development Assistance (ODA) in the
            world[1]. In 2021, the Community together with the Member States
            (Team Europe) financed over 4,355% of aid on a global scale[2]. The
            general budget and the European Development Fund (EDF) finance
            approximately 20% of EU expenditure on development assistance. The
            rest are Member States' initiatives implemented under national aid
            schemes. The EU institutions and Member States have committed to
            jointly achieving an ODA/GNI ratio of 0.7% by 2030.
          </Typography>
          <Container maxWidth="md" sx={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Official site:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>https://european-union.europa.eu/</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Board members:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>Ursula von der Leyen</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Smart contract:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  0x06f333ca1c1b3d08f487d67a5a377cb92d3695ba85d4cc30855733d6a160caba
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>Balance:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>124414.1151 ETH</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Citizens satisfaction:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>2.98 / 5</Typography>
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

export default BeneficientPage;
