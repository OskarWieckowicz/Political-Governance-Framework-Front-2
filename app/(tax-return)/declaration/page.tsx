"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  TextField,
  Typography,
} from "../../mui/mui";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Declaration } from "./Declaration";

type DeclarationFormData = {
  revenue: number;
  expense: number;
};

async function getData(session): Promise<Declaration> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/declaration`,
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
}

async function postData(
  session,
  payload: DeclarationFormData
): Promise<Declaration> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/declaration`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function getPreviousMonth(): string {
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  return previousMonth.toLocaleString("default", { month: "long" });
}

const DeclarationPage = () => {
  const prevMonth = getPreviousMonth();
  const [isSubmitted, setIsSubmited] = useState(false);
  const [declaration, setDeclaration] = useState<Declaration>();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  useEffect(() => {
    if (session) {
      getData(session).then((response: Declaration) => {
        setDeclaration(response);
        if (response.billingPeriod) {
          setIsSubmited(true);
        }
      });
    }
  }, [session]);

  const month = "May";
  const { handleSubmit, register } = useForm({
    defaultValues: {
      revenue: 0,
      expense: 0,
    },
  });

  const onSubmit = async (formData: DeclarationFormData) => {
    const resp = await postData(session, formData);
    setDeclaration(resp);
    setIsSubmited(true);
  };

  const makeCorrectionHandler = () => {
    setIsSubmited(false);
  };

  const formView = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Typography gutterBottom variant="h6">
            Please provide your revenue and expense:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body1" marginRight="20px">
              Revenue:
            </Typography>
            <TextField
              type="number"
              variant="standard"
              inputProps={{
                step: "0.01",
              }}
              {...register("revenue", {
                valueAsNumber: true,
              })}
              margin="normal"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body1" marginRight="20px">
              Expense:
            </Typography>
            <TextField
              type="number"
              variant="standard"
              inputProps={{
                step: "0.01",
              }}
              {...register("expense", {
                valueAsNumber: true,
              })}
              margin="normal"
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" type="submit" sx={{ mt: 2, ml: "auto" }}>
            Accept and Send
          </Button>
        </CardActions>
      </form>
    );
  };

  const submittedView = () => {
    return (
      <>
        <CardContent>
          <Typography gutterBottom variant="h6">
            Your declaration:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body1" marginRight="20px">
              Revenue:
            </Typography>
            <Typography variant="body1">{declaration?.revenue}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body1" marginRight="20px">
              Expense:
            </Typography>
            <Typography variant="body1">{declaration?.expense}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body1" marginRight="20px">
              Income:
            </Typography>
            <Typography variant="body1">{declaration?.income}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" marginRight="20px">
              Taxes to pay (12%):
            </Typography>
            <Typography color="#2eeb21" variant="h4">
              {declaration?.taxes}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            onClick={makeCorrectionHandler}
          >
            Make a correction
          </Button>
        </CardActions>
      </>
    );
  };

  return (
    <Container>
      <Card>
        <CardHeader title={`Tax return for ${prevMonth}`} />
        <Divider />
        {isSubmitted ? submittedView() : formView()}
      </Card>
    </Container>
  );
};

export default DeclarationPage;
