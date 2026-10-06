import Link from "next/link";

// Rendered for unknown URLs and whenever notFound() is called.
export default function NotFound() {
  return (
    <section className="narrow">
      <h1>404 – Not found</h1>
      <p className="muted">We couldn&apos;t find what you were looking for.</p>
      <Link href="/">← Back home</Link>
    </section>
  );
}
