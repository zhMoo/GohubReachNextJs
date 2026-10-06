import { getMessages, getStates } from "@/lib/storage";
import GuestbookForm from "@/components/GuestbookForm";

export const metadata = { title: "Guestbook" };

// Always render fresh, so new messages show up straight away.
export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("en-MY", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kuala_Lumpur",
});

export default async function GuestbookPage() {
  const [messages, states] = await Promise.all([getMessages(), getStates()]);
  const nameOf = (slug) => states.find((s) => s.slug === slug)?.name ?? slug;

  return (
    <section>
      <span className="badge">Server Component</span>
      <h1>Guestbook</h1>
      <p className="muted">
        Tell us your favourite Malaysian food or place. Messages are saved in memory by{" "}
        <code>lib/storage.js</code>, so they reset when the server restarts.
      </p>

      <GuestbookForm states={states.map(({ slug, name }) => ({ slug, name }))} />

      <h2>{messages.length} messages</h2>
      <ul className="list">
        {messages.map((m) => (
          <li key={m.id} className="card">
            <strong>{m.name}</strong> <span className="muted">from {nameOf(m.state)}</span>
            <p style={{ margin: "0.4rem 0" }}>{m.text}</p>
            <span className="muted">{dateFormat.format(new Date(m.createdAt))}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
