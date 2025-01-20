import ReactMarkdown from "react-markdown";

export default function PrivacyPolicyPage() {
  const privacyPolicy = `
# Privacy Policy

Last updated: December 24, 2024

## Introduction

Welcome to OpenForge Inc. ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.

## Consent

By using our website or application, you explicitly consent to the collection and use of your personal information as described in this Privacy Policy. We want to be clear that:
- We only collect information that you voluntarily provide through our platform
- Your data is used solely for providing and improving our services
- We do not share, sell, rent, or trade your personal information with third parties
- You maintain control over your personal information at all times

## Company Information

OpenForge Inc. is registered in Quebec, Canada. You can reach us at:

- **Website:** [open-forge.com](https://open-forge.com)
- **Email:** info@open-forge.com

## Information We Collect

We collect information that you provide directly to us, including:
- Personal identification information (name, email address)
- Account credentials
- User-generated content
- Communication preferences

## How We Use Your Information

We use the collected information for:
- Providing and maintaining our services
- Responding to your requests and inquiries
- Improving our services
- Sending important notifications
- Complying with legal obligations

## Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Withdraw consent
- File a complaint with regulatory authorities

## Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## Contact Us

If you have any questions about this Privacy Policy, please contact us at:
- Email: info@open-forge.com
- Website: open-forge.com

OpenForge Inc.
Quebec, Canada
`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ReactMarkdown className="prose prose-strong:text-white prose-ul:text-white prose-a:text-white prose-headings:text-white text-white max-w-none">
        {privacyPolicy}
      </ReactMarkdown>
    </div>
  );
}
