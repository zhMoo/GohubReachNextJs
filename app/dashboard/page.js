import Link from "next/link";
import { getMessages, getStates, REGIONS } from "@/lib/storage";

export const metadata = { title: "Dashboard" };

// Always render fresh, so the guestbook count is up to date.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Parallel data loading: both calls start at the same time.
  const [states, messages] = await Promise.all([getStates(), getMessages()]);

  const stateCount = states.filter((s) => s.type === "State").length;
  const ftCount = states.length - stateCount;

  return (
    <section>
      <span className="badge">Server Component</span>
      <h1>Overview</h1>

      <div className="grid">
        <div className="card">
          <div className="muted">States</div>
          <div className="stat">{stateCount}</div>
        </div>
        <div className="card">
          <div className="muted">Federal territories</div>
          <div className="stat">{ftCount}</div>
        </div>
        <Link href="/dashboard/guestbook" className="card">
          <div className="muted">Guestbook messages</div>
          <div className="stat">{messages.length}</div>
        </Link>
      </div>

      <h2>By region</h2>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Count</th>
              <th>States / territories</th>
            </tr>
          </thead>
          <tbody>
            {REGIONS.map((r) => {
              const inRegion = states.filter((s) => s.region === r.slug);
              return (
                <tr key={r.slug}>
                  <td className="nowrap">
                    <Link href={`/regions/${r.slug}`}>{r.name}</Link>
                  </td>
                  <td>{inRegion.length}</td>
                  <td>{inRegion.map((s) => s.name).join(", ")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
