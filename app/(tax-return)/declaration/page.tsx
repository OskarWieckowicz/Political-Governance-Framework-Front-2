"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "../../mui/mui";
import { EditIcon } from "../../mui/mui-icons";
import { useForm } from "react-hook-form";

const DeclarationPage = () => {
  const month = "May";
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      revenue: 0,
      expense: 0,
    },
  });
  const [isSubmitted, setIsSubmited] = useState(false);
  const [income, setIncome] = useState(0);
  const [taxesAmount, setTaxesAmount] = useState(0);

  const onSubmit = (data) => {
    console.log(data); // handle form submission logic here
    const calculatedIncome: number = watch("revenue") - watch("expense");
    setIncome(calculatedIncome);
    setTaxesAmount(0.12 * calculatedIncome);
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
            Please provide your reveneu and expense:
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
              {...register("revenue")}
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
              {...register("expense")}
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
            <Typography variant="body1">{watch("revenue")}</Typography>
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
            <Typography variant="body1">{watch("expense")}</Typography>
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
            <Typography variant="body1">{income}</Typography>
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
              {taxesAmount}
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
    <Container sx={{ padding: "15px" }}>
      <Card>
        <CardHeader title={`Tax return for ${month}`} />
        <Divider />
        {isSubmitted ? submittedView() : formView()}
      </Card>
    </Container>
  );
};

export default DeclarationPage;
