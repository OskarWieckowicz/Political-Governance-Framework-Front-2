"use client";
import React, { useEffect, useState } from "react";
import { TaxesDistributionDeclaration } from "../models/TaxesDistributionDeclaration";
import TaxesDistibutionForm from "./TaxesDistibutionForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import PaymentView from "./PaymentView";
import { Box, CircularProgress, Container } from "../mui/mui";
import { TaxDistribution } from "../models/TaxDistribution";
import { Declaration } from "../models/Declaration";
import DeclarationNotSubmittedView from "./DeclarationNotSubmittedView";
import ErrorSnackbar from "../components/ErrorSnackbar";
import { Session } from "next-auth";

async function getTaxesDistributionDeclaration(
  session: Session
): Promise<TaxesDistributionDeclaration> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/taxesDistribution`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDeclaration(session: Session): Promise<Declaration> {
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
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function postData(
  payload: TaxDistribution[],
  session: Session
): Promise<TaxesDistributionDeclaration> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/taxesDistribution`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
}

const PaymentPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const [isSubmitted, setIsSubmited] = useState<boolean>(false);
  const [taxesDistributionDeclaration, setTaxesDistributionDeclaration] =
    useState<TaxesDistributionDeclaration>();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (session) {
      getDeclaration(session)
        .then((res: Declaration) => {
          if (res.billingPeriod) {
            setIsSubmited(true);
            getTaxesDistributionDeclaration(session)
              .then((response: TaxesDistributionDeclaration) => {
                setTaxesDistributionDeclaration(response);
              })
              .catch((e) => setError(e.message));
          } else {
            setIsSubmited(false);
          }
        })
        .catch((e) => setError(e.message));
    }
  }, [session]);

  const onSubmit = (data: { percentages: TaxDistribution[] }) => {
    if (session) {
      postData(data.percentages, session)
        .then((response) => {
          setTaxesDistributionDeclaration(response);
        })
        .catch((e) => setError(e.message));
    }
  };

  return (
    <Container>
      <ErrorSnackbar
        open={error != null}
        onClose={() => setError(null)}
        message={error}
      />
      {!isSubmitted ? (
        <DeclarationNotSubmittedView />
      ) : taxesDistributionDeclaration?.submitted ? (
        <PaymentView />
      ) : taxesDistributionDeclaration?.distributions ? (
        <TaxesDistibutionForm
          onSubmit={onSubmit}
          distributions={taxesDistributionDeclaration?.distributions}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default PaymentPage;
