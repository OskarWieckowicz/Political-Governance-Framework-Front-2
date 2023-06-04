"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "../../mui/mui";
import Link from "next/link";
import { PictureAsPdfIcon } from "@/app/mui/mui-icons";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
type TableData = {
  date: Dayjs;
  amount: number;
  type: string;
  document: string;
};
const DocumentsPage: React.FC = () => {
  const { control, register, handleSubmit, reset } = useForm<TableData>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [data, setData] = useState<TableData[]>([
    {
      date: dayjs(new Date(2018, 8, 18)),
      amount: 123,
      type: "revenue",
      document: "example.pdf",
    },
    // Add more data rows here if needed
  ]);

  const onSubmit = (formData: TableData) => {
    setData([...data, formData]);
    console.log(data);

    reset();
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenDialog} variant="contained" color="primary">
        Add Document
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add Document</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} padding="10px">
                <Controller
                  name="date"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      label="Date"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{ textField: { variant: "outlined" } }}
                    />
                  )}
                />
                <TextField
                  label="Amount"
                  {...register("amount")}
                  type="number"
                />
                <TextField label="Type" {...register("type")} />
                <TextField label="Document" {...register("document")} />
              </Stack>
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Document</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date.format("DD/MM/YYYY")}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Link href={row.document} target="_blank" rel="noopener">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <PictureAsPdfIcon />
                      {row.document}
                    </Box>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DocumentsPage;
