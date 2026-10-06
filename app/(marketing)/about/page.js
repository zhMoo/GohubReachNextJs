import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section>
      <h1>About Jelajah Malaysia</h1>
      <p>
        <em>Jelajah</em> means &ldquo;explore&rdquo;. This app demonstrates the main building
        blocks of the Next.js App Router:
      </p>
      <ul>
        <li>Server Components and Client Components</li>
        <li>Dynamic routes: /states/[slug] and /regions/[region]</li>
        <li>Root, nested (dashboard) and route-group ((marketing)) layouts</li>
        <li>Navigation with next/link and usePathname</li>
        <li>
          Data fetching from a local data store (<code>lib/storage.js</code>): on the server, in
          the browser through a Route Handler, and writing data with a Server Action
        </li>
      </ul>
      <Link href="/">← Back home</Link>
    </section>
  );
}
