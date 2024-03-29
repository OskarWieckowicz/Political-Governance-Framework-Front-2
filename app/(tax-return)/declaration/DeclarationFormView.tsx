import {
  Alert,
  Box,
  Button,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@/app/mui/mui";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: any;
}
const DeclarationFormView = (props: Props) => {
  const { onSubmit } = props;
  const { handleSubmit, register } = useForm({
    defaultValues: {
      revenue: 0,
      expense: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Alert severity="info" sx={{ marginBottom: "15px" }}>
          To submit tax return you need to specifying your total income and
          expense for the previous month. Automatic calculation of the sum of
          revenues and expenses based on attached documents has not been
          implemented and you have to do it manually. Based on provided numbers
          the tax to pay will be calculated. the process resembles the
          settlement of running a sole proprietorship in Poland.
        </Alert>
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
              min: -5,
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
              min: 0,
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

export default DeclarationFormView;
