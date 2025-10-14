import { useMemo, useState } from "react";
import { db } from "@/mock/db";
import type { Order, OrderStatus } from "@/types/ecom";

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Chờ xử lý",
  PROCESSING: "Đang xử lý",
  SHIPPING: "Đang giao",
  COMPLETED: "Hoàn tất",
  CANCELLED: "Hủy",
};

function formatMoney(n: number){ return "₫ " + n.toLocaleString("vi-VN"); }
function orderTotal(o: Order){ return o.items.reduce((s,i)=>s+i.qty*i.price,0); }

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [detail, setDetail] = useState<Order | null>(null);
  const all = db.orders.all();

  const list = useMemo(() => status === "ALL" ? all : all.filter(o => o.status === status), [status, all]);

  const updateStatus = (id: string, s: OrderStatus) => {
    db.orders.updateStatus(id, s);
    // force re-render: state trick
    setStatus(prev => prev);
    if (detail?.id === id) setDetail(db.orders.all().find(o => o.id === id)!);
  };

  return (
    <section className="grid" style={{gap:16}}>
      <div className="card">
        <div style={{display:"flex", gap:12, alignItems:"center", justifyContent:"space-between"}}>
          <h3 style={{margin:0}}>Đơn hàng</h3>
          <select value={status} onChange={e => setStatus(e.target.value as any)} className="btn" style={{padding:"8px 10px"}}>
            <option value="ALL">Tất cả</option>
            {Object.keys(STATUS_LABEL).map(s => <option key={s} value={s}>{STATUS_LABEL[s as OrderStatus]}</option>)}
          </select>
        </div>

        <div style={{marginTop:12, overflowX:"auto"}}>
          <table style={{width:"100%", borderCollapse:"separate", borderSpacing:0}}>
            <thead>
              <tr>
                <th style={th}>Mã đơn</th>
                <th style={th}>Khách hàng</th>
                <th style={th}>Ngày</th>
                <th style={th}>Trạng thái</th>
                <th style={th}>Tổng</th>
                <th style={th}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {list.map(o => (
                <tr key={o.id}>
                  <td style={td}><button className="btn" onClick={()=>setDetail(o)}>{o.code}</button></td>
                  <td style={td}>{o.customerName}</td>
                  <td style={td}>{new Date(o.createdAt).toLocaleString("vi-VN")}</td>
                  <td style={td}><span className="chip">{STATUS_LABEL[o.status]}</span></td>
                  <td style={td}>{formatMoney(orderTotal(o))}</td>
                  <td style={td}>
                    <select value={o.status} onChange={e=>updateStatus(o.id, e.target.value as OrderStatus)} className="btn">
                      {Object.keys(STATUS_LABEL).map(s => <option key={s} value={s}>{STATUS_LABEL[s as OrderStatus]}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td style={td} colSpan={6}>Không có đơn phù hợp</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="card">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <h3 style={{margin:0}}>Chi tiết {detail.code}</h3>
            <button className="btn" onClick={()=>setDetail(null)}>Đóng</button>
          </div>
          <p style={{color:"var(--muted)"}}>Khách: {detail.customerName} • {new Date(detail.createdAt).toLocaleString("vi-VN")}</p>
          <ul style={{margin:0, paddingLeft:18}}>
            {detail.items.map((it, idx)=>(
              <li key={idx} style={{margin:"6px 0"}}>{it.name} × {it.qty} — {formatMoney(it.price * it.qty)}</li>
            ))}
          </ul>
          <p><strong>Tổng: {formatMoney(orderTotal(detail))}</strong></p>
        </div>
      )}
    </section>
  );
}

const th: React.CSSProperties = { textAlign:"left", padding:"10px 12px", borderBottom:"1px solid var(--border)", color:"var(--muted)", fontWeight:600 };
const td: React.CSSProperties = { padding:"10px 12px", borderBottom:"1px solid var(--border)" };
