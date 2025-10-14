import { useEffect, useState } from "react";
import { db } from "@/mock/db";
import type { SiteSettings } from "@/types/ecom";

export default function SettingsPage() {
  const [s, setS] = useState<SiteSettings>(db.settings.get());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // phản ánh darkMode vào theme hiện tại
    document.documentElement.setAttribute("data-theme", s.darkMode ? "dark" : "light");
  }, [s.darkMode]);

  const save = () => {
    db.settings.set(s);
    setSaved(true);
    setTimeout(()=>setSaved(false), 1200);
  };

  return (
    <section className="card">
      <h2 style={{marginTop:0}}>Cấu hình hệ thống</h2>

      <div className="grid" style={{gap:16}}>
        <div>
          <label>Tên shop</label>
          <input value={s.shopName} onChange={e=>setS({...s, shopName: e.target.value})}
                 style={input}/>
        </div>

        <div>
          <label>Logo URL</label>
          <input value={s.logoUrl} onChange={e=>setS({...s, logoUrl: e.target.value})}
                 placeholder="https://…"
                 style={input}/>
          {s.logoUrl && <div style={{marginTop:8}}>
            <img src={s.logoUrl} alt="logo" style={{height:40}} onError={(e)=> (e.currentTarget.style.display="none")} />
          </div>}
        </div>

        <div>
          <label>Tiền tệ</label>
          <select value={s.currency} onChange={e=>setS({...s, currency: e.target.value as any})} className="btn" style={{width:"100%"}}>
            <option value="VND">VND</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label>Theme</label>
          <div style={{display:"flex", gap:12}}>
            <button className={`btn ${!s.darkMode ? "btn-primary" : ""}`} onClick={()=>setS({...s, darkMode:false})}>Light</button>
            <button className={`btn ${s.darkMode ? "btn-primary" : ""}`} onClick={()=>setS({...s, darkMode:true})}>Dark</button>
          </div>
        </div>
      </div>

      <div style={{marginTop:16, display:"flex", gap:12}}>
        <button className="btn btn-primary" onClick={save}>Lưu</button>
        {saved && <span className="chip">Đã lưu</span>}
      </div>
    </section>
  );
}
const input: React.CSSProperties = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1px solid var(--border)", background:"#fff0", color:"var(--text)" };
