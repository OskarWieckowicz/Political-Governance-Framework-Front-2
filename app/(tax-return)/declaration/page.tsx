"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, Container, Divider } from "../../mui/mui";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Declaration } from "../../models/Declaration";
import ErrorSnackbar from "@/app/components/ErrorSnackbar";
import { SubmittedDeclarationView } from "./SubmittedDeclarationView";
import DeclarationFormView from "./DeclarationFormView";
import { DeclarationFormData } from "@/app/models/DeclarationFormData";
import { Session } from "next-auth";

async function getData(session: Session): Promise<Declaration> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/declaration`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

function getPreviousMonth(): string {
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  return previousMonth.toLocaleString("en-US", { month: "long" });
}

async function putData(session: Session, payload: DeclarationFormData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/declaration`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Request failed!");
  }

  return res.json();
}

const DeclarationPage = () => {
  const [error, setError] = useState(null);
  const prevMonth = getPreviousMonth();
  const [isSubmitted, setIsSubmited] = useState(false);
  const [declaration, setDeclaration] = useState<Declaration>();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  useEffect(() => {
    if (session) {
      getData(session)
        .then((response: Declaration) => {
          setDeclaration(response);
          if (response.billingPeriod) {
            setIsSubmited(true);
          }
        })
        .catch((e) => setError(e.message));
    }
  }, [session]);

  const onSubmit = async (formData: DeclarationFormData) => {
    if (session) {
      putData(session, formData)
        .then((resp) => {
          setDeclaration(resp);
          setIsSubmited(true);
        })
        .catch((e) => setError(e.message));
    }
  };

  const makeCorrectionHandler = () => {
    setIsSubmited(false);
  };

  return (
    <Container>
      <ErrorSnackbar
        open={error != null}
        onClose={() => setError(null)}
        message={error}
      />
      <Card>
        <CardHeader title={`Tax return for ${prevMonth}`} />
        <Divider />
        {isSubmitted ? (
          declaration && (
            <SubmittedDeclarationView
              makeCorrectionHandler={makeCorrectionHandler}
              declaration={declaration}
            />
          )
        ) : (
          <DeclarationFormView onSubmit={onSubmit} />
        )}
      </Card>
    </Container>
  );
};

export default DeclarationPage;
