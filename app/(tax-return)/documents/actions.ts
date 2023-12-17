"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { DocumentEntrySchema } from "./schema";

async function createDocument(formData: FormData) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.BACKEND_URL}/documents`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function addNewDocumentAction(formData: FormData) {
  const { amount, type, file, date } = Object.fromEntries(formData);

  const validationPayload = {
    amount: +amount,
    type: type.toString(),
    file,
    date,
  };
  console.log(validationPayload);
  const result = DocumentEntrySchema.safeParse(validationPayload);
  if (result.success == false) {
    return { error: result.error.format() };
  }
  await createDocument(formData);
  revalidatePath("documents");
}
