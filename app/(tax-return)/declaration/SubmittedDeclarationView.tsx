import { Declaration } from "@/app/models/Declaration";
import {
  Alert,
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@/app/mui/mui";

interface Props {
  declaration: Declaration;
  makeCorrectionHandler: () => void;
}

export const SubmittedDeclarationView = (props: Props) => {
  const { declaration, makeCorrectionHandler } = props;
  return (
    <>
      <CardContent>
        <Alert severity="info" sx={{ marginBottom: "15px" }}>
          Your tax return declaration for the previous month has been submitted.
          If you need to make any corrections, please use the button below. You
          can proceed to the 'Payment' tab to fulfill your tax obligations.
        </Alert>
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
          <Typography variant="h6" marginRight="20px">
            Taxes to pay (12%):
          </Typography>
          <Typography color="#2eeb21" variant="h6">
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
