"use client";
import { signUpAction } from "@/app/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackEvent } from "fathom-client";
import Link from "next/link";

export default function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-2 flex items-center sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex justify-start py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-fragment-mono text-indigo-600 font-medium">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-indigo-600 hover:text-indigo-500 font-medium underline"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
            <div>
              <p className="text-secondary">
                Upon signing up you will be waitlisted for our limited beta.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCase" className="font-fragment-mono text-sm">
              Use case
            </Label>
            <textarea
              name="useCase"
              placeholder="What problem are you looking to solve?"
              required
              className="w-full h-32 px-3 py-2 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            trackEvent("signUpSubmit");
            const form = e.target as HTMLFormElement;
            form.submit();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="font-fragment-mono text-sm">
              Email
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="font-fragment-mono text-sm">
                First name
              </Label>
              <Input
                id="firstname"
                name="firstname"
                placeholder="John"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="font-fragment-mono text-sm">
                Last name
              </Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Doe"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="font-fragment-mono text-sm">
              Company name
            </Label>
            <Input name="companyName" placeholder="Acme Inc." required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="companySector"
                className="font-fragment-mono text-sm"
              >
                Company sector
              </Label>
              <Select name="companySector" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="companySize"
                className="font-fragment-mono text-sm"
              >
                Company size
              </Label>
              <Select name="companySize" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501+">501+ employees</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="font-fragment-mono text-sm">
              Role
            </Label>
            <Select name="role" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="cto">CTO</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-fragment-mono text-sm">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
          </div>

          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md"
          >
            Sign up
          </SubmitButton>

          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
