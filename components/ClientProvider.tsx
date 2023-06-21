"use client";

import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
}
