import Link from "next/link";
import { REGIONS } from "@/lib/storage";
import RegionExplorer from "@/components/RegionExplorer";

// SERVER component (the default in the App Router).
export default function HomePage() {
  return (
    <section>
      <h1>Selamat datang! Welcome to Jelajah Malaysia</h1>
      <p className="muted">
        Explore Malaysia&apos;s 13 states and 3 federal territories: their capitals, famous food and
        places to visit. All data is stored locally in <code>lib/storage.js</code>.
      </p>

      <div className="grid" style={{ marginTop: "1.5rem" }}>
        <Link href="/states" className="card">
          <span className="badge">Server Component</span>
          <h3>All states</h3>
          <p className="muted">Search and filter, with a page for each state: /states/[slug].</p>
        </Link>
        <Link href="/regions/northern" className="card">
          <span className="badge">Dynamic Route</span>
          <h3>Regions</h3>
          <p className="muted">From the Northern Region to East Malaysia: /regions/[region].</p>
        </Link>
        <Link href="/dashboard" className="card">
          <span className="badge">Nested Layout</span>
          <h3>Dashboard</h3>
          <p className="muted">Overview, a guestbook and settings inside a sidebar layout.</p>
        </Link>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <RegionExplorer regions={REGIONS} />
      </div>
    </section>
  );
}
