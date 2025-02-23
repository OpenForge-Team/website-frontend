"use client";
import RagChat from "@/components/rag-chat";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WHITELISTED_DOMAINS } from "./config";

export default function ChatWidgetPage() {
  const searchParams = useSearchParams();
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
  }, [searchParams]);

  // Get parameters from URL
  const userId = searchParams.get("userId");
  const subjectId = searchParams.get("subjectId");
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Invalid site identity. This widget can only be embedded on
            whitelisted domains.
          </p>
          <p className="text-sm text-gray-500 mt-2">Origin: {origin}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <RagChat
        editable={true}
        mode={"chat"}
        user_id={userId || ""}
        subject_id={subjectId || ""}
        is_widget={true}
      />
    </div>
  );
}
