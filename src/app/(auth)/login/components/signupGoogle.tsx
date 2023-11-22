"use client";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React from "react";

export default function SignupGoogleComponent() {
  return (
    <Button
      onPress={() => {
        signIn("google", { callbackUrl: `/`, redirect: true });
      }}
      color="primary"
      fullWidth
    >
      Google
    </Button>
  );
}
