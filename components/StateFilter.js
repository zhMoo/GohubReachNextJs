"use client";

// CLIENT component: search box + region filter. The data is loaded by the
// server component (app/states/page.js) and passed in as props.

import { useState } from "react";
import Link from "next/link";

export default function StateFilter({ states, regions }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");

  const q = query.trim().toLowerCase();
  const filtered = states.filter(
    (s) =>
      (region === "all" || s.region === region) &&
      (s.name.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q)),
  );

  return (
    <div>
      <div className="toolbar" style={{ justifyContent: "flex-start" }}>
        <input
          type="search"
          placeholder="Search by state or capital…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search states"
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Region">
          <option value="all">All regions</option>
          {regions.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <p className="muted">
        Showing {filtered.length} of {states.length}
      </p>

      <ul className="grid list">
        {filtered.map((s) => (
          <li key={s.slug}>
            {/* Dynamic route: /states/[slug] */}
            <Link href={`/states/${s.slug}`} className="card">
              <span className={`badge${s.type === "State" ? "" : " ft"}`}>{s.type}</span>
              <h3>{s.name}</h3>
              <span className="muted">Capital: {s.capital}</span>
            </Link>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p className="muted">Nothing matches “{query}”.</p>}
    </div>
  );
}
