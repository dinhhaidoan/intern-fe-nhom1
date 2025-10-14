import { useState } from "react";
import { db } from "@/mock/db";
import type { UserAccount, UserRole } from "@/types/ecom";

export default function UsersPage() {
  const [users, setUsers] = useState<UserAccount[]>(db.users.all());

  const toggleBlock = (id: string) => {
    db.users.toggleBlock(id);
    setUsers(db.users.all());
  };
  const setRole = (id: string, role: UserRole) => {
    db.users.setRole(id, role);
    setUsers(db.users.all());
  };

  return (
    <section className="card">
      <h3 style={{marginTop:0}}>Tài khoản người dùng</h3>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%", borderCollapse:"separate", borderSpacing:0}}>
          <thead>
            <tr>
              <th style={th}>Tên</th>
              <th style={th}>Email</th>
              <th style={th}>Quyền</th>
              <th style={th}>Trạng thái</th>
              <th style={th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={td}>{u.name}</td>
                <td style={td}>{u.email}</td>
                <td style={td}>
                  <select className="btn" value={u.role} onChange={e => setRole(u.id, e.target.value as UserRole)}>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                  </select>
                </td>
                <td style={td}>{u.isBlocked ? <span className="chip">Đã khóa</span> : "Hoạt động"}</td>
                <td style={td}>
                  <button className="btn" onClick={()=>toggleBlock(u.id)}>{u.isBlocked ? "Mở khóa" : "Khóa"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
const th: React.CSSProperties = { textAlign:"left", padding:"10px 12px", borderBottom:"1px solid var(--border)", color:"var(--muted)", fontWeight:600 };
const td: React.CSSProperties = { padding:"10px 12px", borderBottom:"1px solid var(--border)" };
