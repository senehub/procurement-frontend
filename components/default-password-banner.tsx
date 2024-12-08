"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function DefaultPasswordBanner() {
  const query = useQuery({
    staleTime: 1000 * 60 * 3,
    queryKey: ["dpv"],
    queryFn: async () => {
      const response = await fetch("/api/dpv");
      const data: { verified: boolean } = await response.json();

      return data;
    },
  });

  if (!query.data || query.data.verified) return null;

  return (
    <div className="p-6 border-destructive border-b bg-destructive/10">
      <p className="text-destructive max-w-[70ch] mx-auto text-center text-sm">
        Your password has not been updated. Please change your default password
        to ensure your account&apos;s security.
      </p>
    </div>
  );
}
