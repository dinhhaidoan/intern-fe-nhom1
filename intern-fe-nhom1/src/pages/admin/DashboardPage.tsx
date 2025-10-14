import { db } from "@/mock/db";
import type { Order } from "@/types/ecom";

function sumRevenue(orders: Order[]) {
  return orders
    .filter(o => o.status === "COMPLETED")
    .reduce((acc, o) => acc + o.items.reduce((t, i) => t + i.qty * i.price, 0), 0);
}

export default function DashboardPage() {
  const orders = db.orders.all();
  const total = orders.length;
  const completed = orders.filter(o => o.status === "COMPLETED").length;
  const revenue = sumRevenue(orders);

  const topItems = Object.entries(
    orders.flatMap(o => o.items).reduce<Record<string, { name: string; qty: number }>>((m, i) => {
      m[i.productId] = m[i.productId] ? { name: i.name, qty: m[i.productId].qty + i.qty } : { name: i.name, qty: i.qty };
      return m;
    }, {})
  )
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  return (
    <section className="grid cols-3">
      <div className="card">
        <div className="chip">Tổng đơn</div>
        <h3 style={{margin:"8px 0 4px"}}>{total}</h3>
        <p style={{color:"var(--muted)", margin:0}}>Đơn phát sinh</p>
      </div>
      <div className="card">
        <div className="chip">Hoàn tất</div>
        <h3 style={{margin:"8px 0 4px"}}>{completed}</h3>
        <p style={{color:"var(--muted)", margin:0}}>Đơn đã giao</p>
      </div>
      <div className="card">
        <div className="chip">Doanh thu</div>
        <h3 style={{margin:"8px 0 4px"}}>₫ {revenue.toLocaleString("vi-VN")}</h3>
        <p style={{color:"var(--muted)", margin:0}}>Tính từ đơn COMPLETED</p>
      </div>

      <div className="card" style={{ gridColumn: "1 / -1" }}>
        <h3 style={{marginTop:0}}>Top sản phẩm</h3>
        <ul style={{margin:0, paddingLeft:16}}>
          {topItems.map(it => (
            <li key={it.id} style={{margin:"6px 0"}}>{it.name} <span className="chip">{it.qty} bán</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
