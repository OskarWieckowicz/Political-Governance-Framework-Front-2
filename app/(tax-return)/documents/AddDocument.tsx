"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "../../mui/mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { addNewDocumentAction } from "./actions";
import { TransactionType } from "@/app/models/TypeEnum";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import { DateValidationError } from "@mui/x-date-pickers";
import { Add } from "@mui/icons-material";

interface ValidationErrorType {
  date?: { _errors: string[] };
  amount?: { _errors: string[] };
  file?: { _errors: string[] };
  type?: { _errors: string[] };
}

const AddDocument = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedType, setSelectedType] = useState<string>(
    TransactionType.Revenue
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationError, setValidationError] =
    useState<ValidationErrorType | null>(null);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const clientAction = async (data: FormData) => {
    const result = await addNewDocumentAction(data);
    if (result?.error) {
      setValidationError(result.error);
    } else {
      setValidationError(null);
      formRef?.current?.reset();
      handleCloseDialog();
    }
  };

  const handleDateChange = (
    date: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    setSelectedDate(date as Dayjs);
  };

  return (
    <div>
      <Button onClick={handleOpenDialog} variant="contained" color="primary">
        <Add /> Add Document
      </Button>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Add Document</DialogTitle>
          <form action={clientAction} ref={formRef}>
            <DialogContent>
              <Stack spacing={2} padding="10px">
                <DatePicker
                  format="DD.MM.YYYY"
                  slotProps={{ textField: { name: "date" } }}
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                {validationError?.date && (
                  <p>{validationError.date._errors.join(", ")}</p>
                )}
                <TextField
                  name="amount"
                  label="Amount"
                  type="number"
                  inputProps={{
                    step: "0.01",
                    min: 0,
                  }}
                />
                {validationError?.amount && (
                  <p>{validationError.amount._errors.join(", ")}</p>
                )}
                <FormControl fullWidth>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    labelId="type-label"
                    name="type"
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                  >
                    <MenuItem value="Revenue">
                      {TransactionType.Revenue}
                    </MenuItem>
                    <MenuItem value="Expense">
                      {TransactionType.Expense}
                    </MenuItem>
                  </Select>
                </FormControl>
                {validationError?.type && (
                  <p>{validationError.type._errors.join(", ")}</p>
                )}
                <input type="file" name="file" />
                {validationError?.file && (
                  <p>{validationError.file._errors.join(", ")}</p>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Add
              </Button>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
};

export default AddDocument;
