import SidebarLink from "@/components/SidebarLink";

// NESTED / CUSTOM LAYOUT: applies to /dashboard and every route below it.
// It sits inside the root layout, so the Navbar is still shown above it.
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <SidebarLink href="/dashboard">Overview</SidebarLink>
        <SidebarLink href="/dashboard/guestbook">Guestbook</SidebarLink>
      </aside>
      <div>{children}</div>
    </div>
  );
}
