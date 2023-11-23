/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";

export default function UmkmPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }
  return <div className="flex justify-center items-center min-h-screen"></div>;
}
