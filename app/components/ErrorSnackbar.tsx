import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
interface Props {
  open: boolean;
  onClose: () => void;
  message: string | null;
}

function ErrorSnackbar({ open, onClose, message }: Props) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
