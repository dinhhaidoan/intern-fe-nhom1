import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light"
    );
  }, [theme]);
  return (
    <button className="btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}

export default function AdminHeader() {
  return (
    <header className="header">
      <div>
        <div className="breadcrumbs">
          <strong style={{color:"var(--text)"}}>Admin</strong>
          <span>/</span>
          <span>Dashboard</span>
        </div>
      </div>

      <div className="actions">
        <input className="search" placeholder="Search..." />
        <ThemeToggle />
        <img src="https://i.pravatar.cc/36" alt="avatar" style={{borderRadius:999}} />
      </div>
    </header>
  );
}
