"use client";
import { Delete } from "../../mui/mui-icons";
import React, { useState } from "react";
import { DocumentData } from "@/app/models/DocumentData";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { deleteDocumentAction } from "./actions";

interface Props {
  documentData: DocumentData;
}

const DeleteButton = (props: Props) => {
  const { documentData } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDownloadButtonClick = async () => {
    setIsDialogOpen(false);
    await deleteDocumentAction(documentData.key);
  };

  return (
    <Box>
      <IconButton onClick={() => setIsDialogOpen(true)}>
        <Delete />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Delete document</DialogTitle>
        <DialogContent>
          Are you sure that you want to delete this document?
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDownloadButtonClick}>
            Yes
          </Button>
          <Button color="secondary" onClick={() => setIsDialogOpen(false)}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteButton;
