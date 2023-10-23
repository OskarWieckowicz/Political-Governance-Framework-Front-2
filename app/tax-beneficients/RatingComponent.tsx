"use client";
import React from "react";
import { Rating } from "../mui/mui";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Props {
  rating: number;
  taxBeneficiaryId: number;
}

interface RatingRequest {
  value: number;
  taxBeneficiaryId: number;
}

async function putData(payload: RatingRequest, session): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ratings`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

const RatingComponent = (props: Props) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const handleRatingChange = async (newRating) => {
    await putData(
      { value: newRating, taxBeneficiaryId: props.taxBeneficiaryId },
      session
    );
  };
  return (
    <Rating
      name="half-rating"
      defaultValue={props.rating}
      precision={0.5}
      onChange={(event, newValue) => {
        handleRatingChange(newValue);
      }}
    />
  );
};

export default RatingComponent;
