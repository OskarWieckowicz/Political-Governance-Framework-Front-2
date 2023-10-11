"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaxesDistributionDeclaration } from "./TaxesDistributionDeclaration";
import TaxesDistibutionForm from "./TaxesDistibutionForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import PaymentView from "./PaymentView";
import { Box, CircularProgress } from "../mui/mui";
import { TaxDistribution } from "./TaxDistribution";

async function getData(session): Promise<TaxesDistributionDeclaration> {
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

async function postData(
  payload: TaxDistribution[],
  session
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
    throw new Error("Failed to fetch data");
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
  const [taxesDistributionDeclaration, setTaxesDistributionDeclaration] =
    useState<TaxesDistributionDeclaration>();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      revenue: 0,
      expense: 0,
    },
  });

  useEffect(() => {
    if (session) {
      getData(session).then((response: TaxesDistributionDeclaration) => {
        setTaxesDistributionDeclaration(response);
      });
    }
  }, [session]);

  const onSubmit = (data: { percentages: TaxDistribution[] }) => {
    postData(data.percentages, session).then((response) => {
      setTaxesDistributionDeclaration(response);
      console.log(taxesDistributionDeclaration);
    });
  };

  return taxesDistributionDeclaration?.submitted ? (
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
  );
};

export default PaymentPage;
