import { Declaration } from "@/app/models/Declaration";
import {
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
