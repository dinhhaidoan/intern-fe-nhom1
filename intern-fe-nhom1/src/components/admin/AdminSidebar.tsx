import { NavLink } from "react-router-dom";

const items = [
  { label: "Tổng quan", path: "/admin", icon: "📊" },
  { label: "Đơn hàng", path: "/admin/orders", icon: "🧾" },
  { label: "Người dùng", path: "/admin/users", icon: "👥" },
  { label: "Cài đặt", path: "/admin/settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Intern FE</div>
      <nav className="nav">
        {items.map(i => (
          <NavLink key={i.path} to={i.path} className={({isActive}) => isActive ? "active" : ""}>
            <span style={{width:22, textAlign:"center"}} aria-hidden>{i.icon}</span>
            <span className="label">{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
