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
"use client";
import { useEffect, useState } from "react";
import { WHITELISTED_DOMAINS } from "./config";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    // Get the referrer domain
    const referrer = document.referrer;
    const url = referrer ? new URL(referrer) : null;
    const domain = url ? url.host : window.location.host;
    setOrigin(domain);

    // Check if domain is whitelisted
    const isDomainAllowed = WHITELISTED_DOMAINS.includes(domain);
    setIsAllowed(isDomainAllowed);
  }, []);

  if (isAllowed === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">
            Invalid site identity. This widget can only be embedded on whitelisted
            domains.
          </p>
          <p className="text-sm text-gray-500 mt-2">Origin: {origin}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
