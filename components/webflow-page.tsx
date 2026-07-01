"use client";

import React from "react";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";

interface WebflowPageProps {
  /** The patched Webflow HTML string (navbar already stripped) */
  html: string;
  /** Optional React content injected after the Webflow HTML (e.g. reviews widget) */
  children?: React.ReactNode;
}

/**
 * Client component that injects the React AutoklinikNavbar on top of the
 * Webflow-generated page HTML. The HTML is rendered via dangerouslySetInnerHTML
 * inside a wrapper that acts as the document body.
 */
export function WebflowPage({ html, children }: WebflowPageProps) {
  return (
    <>
      <AutoklinikNavbar />
      {/* suppressHydrationWarning: Webflow JS mutates the DOM at runtime
          (adds w-mod-js classes, inline styles) causing unavoidable SSR/client
          mismatches. The content is functionally correct on both sides. */}
      <div dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />
      {children}
    </>
  );
}
