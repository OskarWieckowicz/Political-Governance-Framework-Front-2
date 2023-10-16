import React from "react";
import { Box, Container, Stack, Typography, Grid } from "../mui/mui";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Profile } from "../models/Profile";

async function getProfile(): Promise<Profile> {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.BACKEND_URL}/users`, {
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

const ProfilePage = async () => {
  const user: Profile = await getProfile();
  return (
    <Container>
      <Typography
        align="center"
        marginBottom="30px"
        marginTop="10px"
        variant="h4"
      >
        Personal Data
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Name:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.firstName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Last name:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.lastName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Tax ID:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.taxId}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Country:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.address.country}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>City:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.address.city}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Street:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.address.street}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Postal:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.address.postalCode}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Phone:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.phone}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: "bold" }}>Mail:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>{user.mail}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
