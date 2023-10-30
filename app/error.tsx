"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Box, Button, Container, Paper, Typography } from "./mui/mui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Paper style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" paragraph>
          We encountered an error while processing your request.
        </Typography>
        <Button variant="contained" color="primary" onClick={reset}>
          Try Again
        </Button>
        <Box sx={{ marginTop: "20px" }}>
          <Link href="/">Go back home</Link>
        </Box>
      </Paper>
    </Container>
  );
}
