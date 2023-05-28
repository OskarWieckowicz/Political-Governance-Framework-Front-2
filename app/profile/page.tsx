import React from "react";
import { Box, Container, Stack, Typography, Grid } from "../mui/mui";
interface Address {
  country: string;
  city: string;
  street: string;
  postalCode: string;
}
interface Profile {
  firstName: string;
  lastName: string;
  taxId: string;
  address: Address;
  mail: string;
  phone: string;
}
const ProfilePage = () => {
  const user: Profile = {
    firstName: "Oskar",
    lastName: "Więckowicz",
    taxId: "19823714912",
    address: {
      country: "Poland",
      city: "Kielce",
      street: "Śliczna 44/12",
      postalCode: "50-123",
    },
    mail: "oskar123@gmail.com",
    phone: "123123123",
  };
  return (
    <Container>
      <Typography marginBottom="10px" marginTop="10px" variant="h4">
        Personal Data
      </Typography>
      <Grid container spacing={2} maxWidth="300px">
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.firstName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Last name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.lastName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Tax ID:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.taxId}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Country:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.address.country}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>City:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.address.city}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Street:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.address.street}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Postal:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.address.postalCode}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Phone:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.phone}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold" }}>Mail:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.mail}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
