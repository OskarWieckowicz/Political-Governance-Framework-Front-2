import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Typography,
  InputAdornment,
  Alert,
} from "../mui/mui";
import { TaxDistribution } from "../models/TaxDistribution";

interface Props {
  distributions: TaxDistribution[];
  onSubmit: any;
}
const TaxesDistibutionForm = (props: Props) => {
  const initialValues = props.distributions;
  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      percentages: initialValues.map((item) => ({
        percentage: item.percentage,
        destination: item.destination,
      })),
    },
  });
  const [total, setTotal] = useState(100);

  const handlePercentageChange = (index: number, value: number) => {
    setValue(`percentages.${index}.percentage`, isNaN(value) ? 0 : value);
    setTotal(
      getValues("percentages").reduce(
        (sum, item) => sum + (isNaN(item.percentage) ? 0 : item.percentage),
        0
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Card>
        <CardHeader title={`Chose tax distrubution`} />
        <CardContent>
          <Alert severity="info" sx={{ marginBottom: "20px" }}>
            Below is a list of institutions along with the percentage of your
            total tax liabilities. You can leave the default values ​​or adjust
            them to your needs. Remember that the sum of the percentages must
            equal 100%. Think carefully about your choice, because you cannot
            withdraw the distribution and can only change it next month.
          </Alert>
          <Grid container spacing={2}>
            {initialValues.map((item, index) => (
              <Grid item xs={2} key={index}>
                <Controller
                  name={`percentages.${index}.percentage`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                      }}
                      {...field}
                      label={item.destination}
                      type="number"
                      inputProps={{ min: 0, max: 100 }}
                      onChange={(e) =>
                        handlePercentageChange(
                          index,
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Typography
              sx={{ color: total === 100 ? "green" : "red" }}
              variant="h4"
            >
              Total: {total}%
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            type="submit"
            sx={{ ml: "auto" }}
            disabled={total !== 100}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default TaxesDistibutionForm;
