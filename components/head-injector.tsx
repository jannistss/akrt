"use client";

import { useEffect } from "react";

interface HeadInjectorProps {
  /** Raw HTML string of <head> content to inject (links, styles, scripts) */
  headHtml: string;
}

/**
 * Injects additional Webflow <head> content (Google Fonts, inline styles, etc.)
 * into the document <head> at mount time. This preserves Webflow's CSS and
 * font dependencies while using a proper Next.js layout.
 */
export function HeadInjector({ headHtml }: HeadInjectorProps) {
  useEffect(() => {
    // Create a temporary container to parse the head HTML
    const temp = document.createElement("div");
    temp.innerHTML = headHtml;

    const injected: Element[] = [];

    Array.from(temp.children).forEach((el) => {
      const tag = el.tagName.toLowerCase();
      // Skip meta charset, viewport, title, generator — Next.js handles those
      if (tag === "meta") {
        const name = el.getAttribute("name") || "";
        const charset = el.getAttribute("charset");
        if (charset || name === "viewport" || name === "generator") return;
      }
      if (tag === "title") return;

      let node: HTMLElement | null = null;

      if (tag === "link") {
        const link = document.createElement("link");
        Array.from(el.attributes).forEach((attr) => {
          // Remove integrity to avoid SRI blocking on local assets
          if (attr.name === "integrity" || attr.name === "crossorigin") return;
          link.setAttribute(attr.name, attr.value);
        });
        node = link;
      } else if (tag === "style") {
        const style = document.createElement("style");
        style.textContent = el.textContent;
        node = style;
      } else if (tag === "script") {
        const script = document.createElement("script");
        Array.from(el.attributes).forEach((attr) => {
          if (attr.name === "integrity" || attr.name === "crossorigin") return;
          script.setAttribute(attr.name, attr.value);
        });
        if (!el.getAttribute("src")) {
          script.textContent = el.textContent;
        }
        node = script;
      }

      if (node) {
        document.head.appendChild(node);
        injected.push(node);
      }
    });

    return () => {
      injected.forEach((el) => {
        if (el.parentNode === document.head) document.head.removeChild(el);
      });
    };
  }, [headHtml]);

  return null;
}
