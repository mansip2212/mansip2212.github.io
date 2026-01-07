import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Transition from "./Pages/Transition";
import AppLayout from "./AppLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Experience from "./Pages/Experience";
import Projects from "./Pages/Projects";
import Hobbies from "./Pages/Hobbies";
import Contact from "./Pages/Contact";
import ChatWidget from "./components/llm/ChatWidget";

export default function App() {
  return (
    <>
      <Routes>
        {/* No sidebar */}
        <Route path="/" element={<Landing />} />
        <Route path="/transition" element={<Transition />} />

        {/* Sidebar layout */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ✅ Global floating AI widget (works on every page) */}
      <ChatWidget />
    </>
  );
}
