import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../mui/mui";
import Link from "next/link";
import { PictureAsPdfIcon } from "@/app/mui/mui-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DocumentData } from "./DocumentData";
import AddDocument from "./AddDocument";

const getData = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:8081/documents", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const DocumentsPage = async () => {
  const data = await getData();
  console.log(data);
  return (
    <>
      <AddDocument />
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
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Link href={"/hi"} target="_blank" rel="noopener">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <PictureAsPdfIcon />
                      {row.file}
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
