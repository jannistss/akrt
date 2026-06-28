"use client";

import { AutoklinikNavbar } from "@/components/autoklinik-navbar";

interface WebflowPageProps {
  /** The patched Webflow HTML string (navbar already stripped) */
  html: string;
}

/**
 * Client component that injects the React AutoklinikNavbar on top of the
 * Webflow-generated page HTML. The HTML is rendered via dangerouslySetInnerHTML
 * inside a wrapper that acts as the document body.
 */
export function WebflowPage({ html }: WebflowPageProps) {
  return (
    <>
      <AutoklinikNavbar />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
