import { getStates, REGIONS } from "@/lib/storage";
import StateFilter from "@/components/StateFilter";

export const metadata = { title: "States" };

// SERVER component: async, loads data directly (no useEffect needed).
export default async function StatesPage() {
  const states = await getStates();

  return (
    <section>
      <span className="badge">Server Component</span>
      <h1>States &amp; federal territories</h1>
      <p className="muted">
        Loaded on the server from <code>lib/storage.js</code>, then passed to a client component
        that handles search and filtering.
      </p>
      <StateFilter states={states} regions={REGIONS} />
    </section>
  );
}
