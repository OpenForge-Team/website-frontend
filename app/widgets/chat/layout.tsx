import { Metadata } from "next";

export const metadata: Metadata = {
  // Allow iframe embedding
  other: {
    "Content-Security-Policy": "frame-ancestors *",
  },
};
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
