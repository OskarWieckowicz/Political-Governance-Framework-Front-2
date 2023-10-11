"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "../../mui/mui";
import { DocumentData } from "../../models/DocumentData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { addNewDocumentAction } from "./actions";

const AddDocument = () => {
  const formRef = useRef();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const clientAction = async (data) => {
    const { amount, type, file } = Object.fromEntries(data);
    const result = await addNewDocumentAction({
      amount: +amount,
      type,
      file,
      date: selectedDate.format(),
    } as DocumentData);
    if (result?.error) {
      setValidationError(result.error);
    } else {
      setValidationError(null);
      formRef.current.reset();
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
                  label="Date" // You can customize the label as needed
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
                <TextField name="type" label="Type" />
                {validationError?.type && (
                  <p>{validationError.type._errors.join(", ")}</p>
                )}
                <TextField name="file" label="Document" />
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
