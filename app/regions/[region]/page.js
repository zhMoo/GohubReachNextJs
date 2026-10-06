import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegion, getStates, REGIONS } from "@/lib/storage";

// DYNAMIC ROUTE: /regions/northern, /regions/east-coast, ...

export function generateStaticParams() {
  return REGIONS.map((r) => ({ region: r.slug }));
}

// Any slug not in the list above returns a 404 page.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { region } = await params;
  const info = getRegion(region);
  return { title: info ? info.name : "Not found" };
}

export default async function RegionPage({ params }) {
  const { region } = await params;
  const info = getRegion(region);
  if (!info) notFound();

  const states = await getStates({ region });

  return (
    <section>
      {/* Region tabs: navigation between dynamic routes */}
      <div className="chips" style={{ marginBottom: "1rem" }}>
        {REGIONS.map((r) => (
          <Link key={r.slug} href={`/regions/${r.slug}`} className={`chip${r.slug === region ? " active" : ""}`}>
            {r.name}
          </Link>
        ))}
      </div>

      <span className="badge">Server Component</span>
      <h1>{info.name}</h1>
      <p className="muted">
        {info.nameBm} · {states.length} {states.length === 1 ? "state" : "states / territories"}
      </p>

      <ul className="grid list">
        {states.map((s) => (
          <li key={s.slug}>
            <Link href={`/states/${s.slug}`} className="card">
              <span className={`badge${s.type === "State" ? "" : " ft"}`}>{s.type}</span>
              <h3>{s.name}</h3>
              <span className="muted">Capital: {s.capital}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
