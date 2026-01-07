import { Outlet } from "react-router-dom";
import FuturisticSidebar from "./FuturisticSidebar";

export default function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* 🌌 Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/space.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Dark overlay (your choice) */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/65" />

      {/* 🧩 App content */}
      <div className="relative z-20 flex min-h-screen">
        <FuturisticSidebar />

        {/* IMPORTANT: no bg-black here */}
        <main className="flex-1 overflow-y-auto bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
