// Route-level loading UI for /states and /states/[slug] (shown while data loads).
export default function StatesLoading() {
  return (
    <div className="card">
      <p className="muted">Loading…</p>
    </div>
  );
}
