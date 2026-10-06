import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegion, getState, getStateSlugs } from "@/lib/storage";
import VisitedButton from "@/components/VisitedButton";

// DYNAMIC ROUTE: /states/johor, /states/sabah, ...
// In Next.js 15+, `params` is a Promise, so it must be awaited.

// Pre-build a page for every state at build time.
export function generateStaticParams() {
  return getStateSlugs().map((slug) => ({ slug }));
}

// Any slug not in the list above returns a 404 page.
export const dynamicParams = false;

// Per-page dynamic metadata (the page title is the state's name).
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const state = await getState(slug);
  return { title: state ? state.name : "Not found" };
}

export default async function StatePage({ params }) {
  const { slug } = await params;
  const state = await getState(slug);
  if (!state) notFound(); // renders app/not-found.js

  const region = getRegion(state.region);

  return (
    <article>
      <p className="breadcrumb">
        <Link href="/states">← All states</Link>
        {" · "}
        <Link href={`/regions/${region.slug}`}>{region.name}</Link>
      </p>
      <span className={`badge${state.type === "State" ? "" : " ft"}`}>{state.type}</span>
      <h1>{state.name}</h1>
      {state.title && <p className="muted">{state.title}</p>}
      <p>{state.description}</p>

      {/* Client component placed inside a server component */}
      <VisitedButton name={state.name} />

      <div className="grid" style={{ marginTop: "1.5rem" }}>
        <div className="card">
          <div className="muted">Capital</div>
          <div className="stat-text">{state.capital}</div>
        </div>
        <div className="card">
          <div className="muted">Region</div>
          <div className="stat-text">{region.name}</div>
          <div className="muted">{region.nameBm}</div>
        </div>
      </div>

      <div className="grid" style={{ marginTop: "1rem" }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Famous food</h2>
          {state.foods.length > 0 ? (
            <ul>
              {state.foods.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">No signature dish listed yet.</p>
          )}
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Places to visit</h2>
          <ul>
            {state.attractions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
