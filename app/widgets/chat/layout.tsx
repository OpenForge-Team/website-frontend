import { Suspense } from "react";
import { WHITELISTED_DOMAINS } from "./config";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
