import { useEffect, useState } from "react";

const KEY = "sanchit_admin_role";

export function useAdminRole() {
  const [role, setRoleState] = useState<"admin" | "user" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as "admin" | "user" | null) ?? null;
    setRoleState(stored);
    setReady(true);
  }, []);

  const setRole = (next: "admin" | "user" | null) => {
    if (next) localStorage.setItem(KEY, next);
    else localStorage.removeItem(KEY);
    setRoleState(next);
  };

  return { role, setRole, ready, isAdmin: role === "admin" };
}
