import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  User,
  Briefcase,
  Folder,
  Mail,
  Gamepad2,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function NavItem({ to, icon: Icon, label, collapsed, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cx(
          "group relative flex items-center rounded-xl px-2 py-2 transition-all duration-200",
          collapsed ? "justify-center" : "gap-3 justify-start",
          isActive
            ? "text-white"
            : "text-white/65 hover:text-white hover:bg-white/4"
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* Active neon indicator */}
          {isActive && (
            <span
              className="
                absolute right-0 top-1/2 -translate-y-1/2
                h-[70%] w-[2px] rounded-full
                bg-[linear-gradient(180deg,rgb(124,122,207),rgb(64,202,255),rgb(255,140,105))]
                shadow-[0_0_12px_rgba(124,122,207,0.6)]
              "
            />
          )}

          {/* Icon container */}
          <span
            className={cx(
              "relative grid place-items-center h-9 w-9 rounded-lg transition-all",
              isActive
                ? "bg-white/8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                : "bg-[linear-gradient(180deg,rgba(8,8,12,0.95),rgba(8,8,12,0.88))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
            )}
          >
            <Icon className="h-4.5 w-4.5" />
          </span>

          {!collapsed && (
            <span className="text-[14px] font-semibold tracking-[-0.01em]">
              {label}
            </span>
          )}

          {collapsed && (
            <span
              className="
                pointer-events-none absolute left-[64px] top-1/2 -translate-y-1/2
                opacity-0 translate-x-[-6px]
                group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-200
                rounded-lg px-3 py-1.5 text-sm font-semibold
                bg-black/80 backdrop-blur-md text-white/90
                shadow-[0_10px_32px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,255,255,0.12)]
              "
            >
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}


export default function FuturisticSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const items = useMemo(
    () => [
      { to: "/home", label: "Home", icon: Sparkles },
      { to: "/about", label: "About", icon: User },
      { to: "/experience", label: "Experience", icon: Briefcase },
      { to: "/projects", label: "Projects", icon: Folder },
      { to: "/hobbies", label: "Hobbies", icon: Gamepad2 },
      { to: "/contact", label: "Contact", icon: Mail },
    ],
    []
  );


  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed left-3 top-3 z-[60] md:hidden
          h-11 w-11 rounded-xl grid place-items-center
          bg-black/85 backdrop-blur-lg
          text-white/90
          shadow-[0_14px_44px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,255,255,0.12)]
        "
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <aside
        className="
          hidden md:flex fixed left-0 top-0 z-40 h-screen w-[72px] px-2 py-4
          bg-[linear-gradient(180deg,rgba(2,2,6,0.96),rgba(6,6,12,0.92))]
          backdrop-blur-[10px]
          shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]
        "
      >
        {/* Neon edge */}
        <div className="absolute right-0 top-0 h-full w-[1.5px] bg-[linear-gradient(180deg,rgba(120,120,255,0.55),rgba(80,200,255,0.35),rgba(255,140,105,0.25))]" />

        <div className="relative flex w-full flex-col items-center gap-3">
          <nav className="flex w-full flex-col gap-2">
            {items.map((i) => (
              <NavItem key={i.to} {...i} collapsed />
            ))}
          </nav>

          <div className="mt-auto h-px w-full bg-white/10" />
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] bg-black/80 md:hidden"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cx(
          "fixed left-0 top-0 z-[80] h-screen w-[240px] md:hidden",
          "bg-[linear-gradient(180deg,rgba(2,2,6,0.97),rgba(6,6,12,0.95))]",
          "backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.85)]",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-4">
          <button
            onClick={() => setOpen(false)}
            className="mb-4 self-end h-10 w-10 grid place-items-center rounded-xl bg-white/6"
          >
            <X className="h-5 w-5" />
          </button>

          <nav className="flex flex-col gap-2">
            {items.map((i) => (
              <NavItem
                key={i.to}
                {...i}
                collapsed={false}
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
