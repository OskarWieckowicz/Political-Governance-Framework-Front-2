"use client";
import React from "react";
import { Box, IconButton } from "../../mui/mui";
import { FileDownload as FileDownloadIcon } from "@/app/mui/mui-icons";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DocumentData } from "@/app/models/DocumentData";
interface Props {
  documentData: DocumentData;
}

const DownloadButton = (props: Props) => {
  const { documentData } = props;
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  async function dowloadFile(): Promise<Blob> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/documents/download?key=${documentData.key}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.blob();
  }

  const handleDownloadClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const fileData = await dowloadFile();
    if (fileData) {
      const url = window.URL.createObjectURL(new Blob([fileData]));
      const a = document.createElement("a");
      a.href = url;
      a.download = documentData.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {documentData.fileName}
      <IconButton onClick={(e) => handleDownloadClick(e)}>
        <FileDownloadIcon />
      </IconButton>
    </Box>
  );
};

export default DownloadButton;
