"use client";

// CLIENT component that fetches data in the browser. It calls our own
// Route Handler (/api/states?region=...), which reads from lib/storage.js.

import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchStates(region) {
  const res = await fetch(`/api/states?region=${region}`);
  if (!res.ok) throw new Error("Could not load states.");
  return res.json();
}

export default function RegionExplorer({ regions }) {
  const [region, setRegion] = useState(regions[0].slug);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs when the user picks a region.
  function changeRegion(slug) {
    setRegion(slug);
    setLoading(true);
    setError(null);
    fetchStates(slug)
      .then(setStates)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  // Loads the first region once, when the component mounts.
  useEffect(() => {
    let ignore = false;
    fetchStates(regions[0].slug)
      .then((data) => !ignore && setStates(data))
      .catch((e) => !ignore && setError(e.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [regions]);

  return (
    <div className="card">
      <span className="badge client">Client Component</span>
      <h3>Explore by region (client-side fetch)</h3>
      <div className="chips" role="group" aria-label="Region">
        {regions.map((r) => (
          <button
            key={r.slug}
            className={r.slug === region ? "primary" : ""}
            onClick={() => changeRegion(r.slug)}
            disabled={loading}
          >
            {r.name}
          </button>
        ))}
      </div>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="muted">{error}</p>}
      {!loading && !error && (
        <ul className="inline-list">
          {states.map((s) => (
            <li key={s.slug}>
              <Link href={`/states/${s.slug}`}>{s.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
