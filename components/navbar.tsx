"use client";

import { useState } from "react";
import { NavLinks } from "@/components/nav-links";
import { Menu, X } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import { trackEvent } from "fathom-client";
import Link from "next/link";
import OpenForgeLogo from "./openforge-logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-[#EEF2FF]/80 backdrop-blur-md z-50 py-2">
      <div className="flex w-full max-w-[1280px] mx-auto px-8 justify-center items-center h-16 gap-8">
        <div className="flex items-center gap-8 flex-grow">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href={process.env.NEXT_PUBLIC_URL!}>
              <OpenForgeLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-grow">
            <NavLinks />
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <CustomButton
            onClick={() => router.push("/sign-in")}
            variant="secondary"
          >
            Sign in
          </CustomButton>
          <CustomButton
            onClick={() => {
              trackEvent("ctaClick", {
                _value: 0,
              });
              router.push("/sign-up");
            }}
          >
            Get Early Access
          </CustomButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#EEF2FF]/80 backdrop-blur-md px-4 py-6 shadow-lg">
          <NavLinks mobile />
          <div className="mt-6 flex flex-col gap-3">
            <CustomButton
              variant="secondary"
              className="w-full"
              onClick={() => router.push("/sign-in")}
            >
              Sign in
            </CustomButton>
            <CustomButton
              className="w-full"
              onClick={() => {
                trackEvent("ctaClick", {
                  _value: 0,
                });
                return router.push("/sign-up");
              }}
            >
              Get Early Access
            </CustomButton>
          </div>
        </div>
      )}
    </nav>
  );
}
