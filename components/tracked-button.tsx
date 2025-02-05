"use client";

import { trackEvent } from "fathom-client";
import React from "react";

export function TrackedButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      onClick={() =>
        trackEvent(`ctaClick_${href.split("/").pop()}`, { _value: 4 })
      }
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
    >
      {label}
    </a>
  );
}
