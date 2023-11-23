// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "./_redux/store";
export function Providers({ children }: { children: React.ReactNode }) {
  const route = useRouter();

  return (
    <Provider store={store}>
      <SessionProvider>
        <NextUIProvider navigate={route.push}>{children}</NextUIProvider>
      </SessionProvider>
    </Provider>
  );
}
