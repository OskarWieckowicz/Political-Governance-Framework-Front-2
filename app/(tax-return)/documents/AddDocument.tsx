"use client";
import React, { useRef, useState } from "react";
import {
  Button,
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
} from "../../mui/mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { addNewDocumentAction } from "./actions";
import { TransactionType } from "@/app/models/TypeEnum";

const AddDocument = () => {
  const formRef = useRef();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedType, setSelectedType] = useState<string>(
    TransactionType.Revenue
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationError, setValidationError] = useState(null);
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
      formRef.current.reset();
      handleCloseDialog();
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Button onClick={handleOpenDialog} variant="contained" color="primary">
        Add Document
      </Button>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Add Document</DialogTitle>
          <form action={clientAction} ref={formRef}>
            <DialogContent>
              <Stack spacing={2} padding="10px">
                <DatePicker
                  slotProps={{ textField: { name: "date" } }}
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                {validationError?.date && (
                  <p>{validationError.date._errors.join(", ")}</p>
                )}
                <TextField name="amount" label="Amount" type="number" />
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
