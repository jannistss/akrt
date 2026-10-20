"use client";

import { useId, useRef, useState } from "react";
import { ArrowUpRight, Check, Search } from "lucide-react";

export function VehicleChoice({ options, value, onSelect, kind }: { options: string[]; value: string; onSelect: (value: string) => void; kind: "Marke" | "Modell" }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const matches = options.filter(option => option.toLocaleLowerCase("de").includes(query.toLocaleLowerCase("de")));
  const visible = query || expanded ? matches : matches.slice(0, 8);
  const custom = query.trim() && !options.some(option => option.toLocaleLowerCase("de") === query.trim().toLocaleLowerCase("de"));
  const choices = custom ? [...visible, query.trim()] : visible;
  return <div className="flex flex-col gap-4">
    <div className="relative">
      <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ak-muted" size={20} aria-hidden="true" />
      <input ref={input} type="search" role="combobox" aria-label={`${kind} suchen oder selbst eingeben`} aria-expanded={true} aria-controls={`${id}-choices`} aria-autocomplete="list" aria-activedescendant={active >= 0 ? `${id}-${active}` : undefined} value={query} placeholder={`${kind} suchen oder selbst eingeben`} maxLength={100} className="purchase-input pl-14" onChange={event => { setQuery(event.target.value); setActive(-1); }} onKeyDown={event => {
        if (event.nativeEvent.isComposing || event.keyCode === 229) return;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const next = event.key === "ArrowDown" ? Math.min(active + 1, choices.length - 1) : Math.max(0, active - 1);
          setActive(next);
          document.getElementById(`${id}-${next}`)?.scrollIntoView({ block: "nearest" });
        }
        if (event.key === "Enter") { event.preventDefault(); if (active >= 0 && choices[active]) onSelect(choices[active]); }
        if (event.key === "Escape") { setQuery(""); setActive(-1); }
      }} />
    </div>
    <div id={`${id}-choices`} role="listbox" aria-label={`${kind} auswählen`} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {choices.map((option, index) => <button id={`${id}-${index}`} type="button" role="option" aria-selected={value === option} key={option} onClick={() => onSelect(option)} className={`purchase-choice min-h-16 flex-col justify-center text-center sm:min-h-20 ${value === option || active === index ? "purchase-choice-selected" : ""}`}>
        <span className="flex items-center justify-center gap-2">{option}{value === option && <Check size={16} aria-hidden="true" />}</span>
        {custom && index === choices.length - 1 && <span className="text-sm font-normal text-ak-muted">Eigene Eingabe übernehmen</span>}
      </button>)}
    </div>
    {!query && options.length > 8 && <button type="button" className="flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-ak-blue hover:underline" onClick={() => setExpanded(!expanded)}>{expanded ? "Weniger anzeigen" : `Alle ${kind === "Marke" ? "Marken" : "Modelle"} anzeigen`}<ArrowUpRight size={16} aria-hidden="true" /></button>}
    {!options.length && !query && <p className="text-base leading-relaxed text-ak-muted">Gib die Modellbezeichnung einfach in das Suchfeld ein.</p>}
  </div>;
}
