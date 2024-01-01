import React from "react";
import {
  Alert,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../mui/mui";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DocumentData } from "../../models/DocumentData";
import AddDocument from "./AddDocument";
import DownloadButton from "./DownloadButton";
import DeleteButton from "./DeleteButton";

async function getData(): Promise<DocumentData[]> {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.BACKEND_URL}/documents`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const DocumentsPage = async () => {
  const data = await getData();

  return (
    <Container>
      <Alert severity="info" sx={{ marginBottom: "20px" }}>
        Please submit documents and invoices verifying your income and expenses
        from the previous month. Ensure each document specifies whether it
        represents &quot;Revenue&quot; or &quot;Expense&quot; along with the
        corresponding amount.
      </Alert>
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
            {data.map((doc, index) => (
              <TableRow key={index}>
                <TableCell>{doc.date}</TableCell>
                <TableCell>{doc.amount}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {doc.fileName}
                  <DownloadButton documentData={doc} />
                  <DeleteButton documentData={doc} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DocumentsPage;
