import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    default: "Jelajah Malaysia",
    template: "%s | Jelajah Malaysia",
  },
  description: "Next.js App Router assignment: explore Malaysia's states and federal territories.",
};

// ROOT LAYOUT: wraps every page. The Navbar lives here so it stays on screen
// across navigations without re-mounting.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
        <footer className="container muted" style={{ paddingTop: 0 }}>
          Jelajah Malaysia · Built with the Next.js App Router · Data stored locally in
          lib/storage.js
        </footer>
      </body>
    </html>
  );
}
