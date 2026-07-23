"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cities } from "@/lib/data";
import { searchCities } from "@/lib/utils";
import type { City } from "@/lib/types";

interface CitySearchProps {
  placeholder?: string;
  redirectTo?: string;
  className?: string;
  onSelect?: (city: City) => void;
}

export function CitySearch({
  placeholder = "Search cities...",
  redirectTo = "/explorer",
  className = "",
  onSelect,
}: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Keep the default menu compact, while broadening state-level searches enough
  // to surface lower-population places such as Fremont.
  const results = searchCities(cities, query).slice(0, query.trim() ? 50 : 8);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCity(city: City) {
    setQuery(`${city.name}, ${city.stateCode}`);
    setOpen(false);
    if (onSelect) onSelect(city);
    else router.push(`${redirectTo}?city=${city.id}`);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlighted(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open || !results.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlighted((h) => Math.min(h + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlighted((h) => Math.max(h - 1, 0));
            } else if (e.key === "Enter" && results[highlighted]) {
              e.preventDefault();
              selectCity(results[highlighted]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="city-search-results"
          aria-autocomplete="list"
          className="w-full h-10 rounded-lg border border-border bg-white pl-10 pr-4 text-sm text-foreground placeholder:text-text-secondary outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
      </div>
      {open && results.length > 0 && (
        <ul id="city-search-results" role="listbox" className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-white shadow-md">
          {results.map((city, i) => (
            <li key={city.id}>
              <button
                type="button"
                onClick={() => selectCity(city)}
                onMouseEnter={() => setHighlighted(i)}
                role="option"
                aria-selected={i === highlighted}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-sm ${
                  i === highlighted ? "bg-accent-light" : "hover:bg-surface"
                }`}
              >
                <span>
                  <span className="font-medium text-foreground">{city.name}</span>
                  <span className="text-text-secondary">, {city.stateCode}</span>
                </span>
                <span className="text-xs text-amber-700">Demo environment</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
