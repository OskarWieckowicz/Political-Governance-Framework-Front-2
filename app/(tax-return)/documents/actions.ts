"use server";

import { revalidatePath } from "next/cache";
import { DocumentData } from "./DocumentData";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { DocumentEntrySchema } from "./schema";

async function createDocument(formData: DocumentData) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.BACKEND_URL}/documents`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function addNewDocumentAction(formData: DocumentData) {
  const { error } = DocumentEntrySchema.safeParse(formData);
  if (error) {
    return { error: error.format() };
  }
  await createDocument(formData);
  revalidatePath("documents");
}
