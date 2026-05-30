import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  LineChart,
  CalendarClock,
  HardDrive,
  Search,
  ShieldAlert,
  BookOpen,
  Megaphone,
  MessageSquare,
  ScrollText,
  Settings as Cog,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useAdminRole } from "@/lib/admin-role";

const nav: Array<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/learning", label: "Learning Analytics", icon: LineChart },
  { to: "/admin/revisions", label: "Revision Analytics", icon: CalendarClock },
  { to: "/admin/files", label: "Files & Storage", icon: HardDrive },
  { to: "/admin/search", label: "Search Analytics", icon: Search },
  { to: "/admin/spam", label: "Spam Detection", icon: ShieldAlert },
  { to: "/admin/subjects", label: "Subjects", icon: BookOpen },
  { to: "/admin/notifications", label: "Notifications", icon: Megaphone },
  { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/admin/logs", label: "System Logs", icon: ScrollText },
  { to: "/admin/settings", label: "Settings", icon: Cog },
];


function AdminGate({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="glass rounded-2xl p-8 max-w-md text-center shadow-elegant">
        <div className="size-14 mx-auto rounded-2xl gradient-primary grid place-items-center shadow-glow">
          <ShieldCheck className="size-7 text-primary-foreground" />
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight">Admin access required</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The admin panel is restricted to users with the <code className="px-1.5 py-0.5 rounded bg-muted text-xs">admin</code> role.
          Continue to preview the panel with admin privileges.
        </p>
        <button
          onClick={onEnter}
          className="mt-6 w-full gradient-primary text-primary-foreground rounded-xl py-2.5 text-sm font-medium shadow-soft hover:shadow-elegant transition-shadow"
        >
          Enter as Admin
        </button>
        <Link to="/" className="block mt-3 text-xs text-muted-foreground hover:text-foreground">
          Back to student app
        </Link>
      </div>
    </div>
  );
}

export function AdminShell() {
  const { isAdmin, ready, setRole } = useAdminRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!ready) return <div className="h-40" />;
  if (!isAdmin) return <AdminGate onEnter={() => setRole("admin")} />;

  return (
    <div className="flex gap-6 -mx-2">
      <aside className="hidden lg:flex w-60 shrink-0 flex-col glass rounded-2xl p-3 h-[calc(100vh-7rem)] sticky top-24">
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="size-8 rounded-lg gradient-primary grid place-items-center">
            <ShieldCheck className="size-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Admin</p>
            <p className="text-[10px] text-muted-foreground mt-1">Control Center</p>
          </div>
        </div>
        <nav className="mt-3 space-y-0.5 flex-1 overflow-y-auto pr-1">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                <n.icon className={`size-3.5 ${active ? "text-primary" : ""}`} />
                <span className="truncate">{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setRole(null)}
          className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] text-muted-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="size-3.5" /> Exit admin mode
        </button>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="lg:hidden mb-4 -mx-2 px-2 overflow-x-auto">
          <div className="flex gap-1.5 pb-2">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium border ${
                    active
                      ? "gradient-primary text-primary-foreground border-transparent"
                      : "bg-card text-muted-foreground border-border"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
