"use client";
import { Delete } from "../../mui/mui-icons";
import React from "react";
import { DocumentData } from "@/app/models/DocumentData";
import { Box, IconButton } from "@mui/material";
import { deleteDocumentAction } from "./actions";

interface Props {
  documentData: DocumentData;
}

const DeleteButton = (props: Props) => {
  const { documentData } = props;

  return (
    <Box>
      <IconButton
        onClick={async () => {
          await deleteDocumentAction(documentData.key);
        }}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};

export default DeleteButton;
