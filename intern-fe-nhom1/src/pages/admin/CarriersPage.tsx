import { useEffect, useMemo, useState } from "react";
import { PageHeader, TableWrap } from "@/components/ui/Page";
import { Button, Input, Select } from "@/components/ui/Controls";
import { Badge } from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Switch from "@/components/ui/Switch";
import CarrierForm from "@/components/admin/CarrierForm";

import type { Carrier, RegionCode } from "@/types/shipping";
import { listCarriers, createCarrier, updateCarrier, deleteCarrier, toggleCarrier } from "@/mock/shipping";

export default function CarriersPage() {
  const [items, setItems] = useState<Carrier[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all"|"active"|"inactive">("all");
  const [regionFilter, setRegionFilter] = useState<"all"|RegionCode>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Carrier | null>(null);
  const [err, setErr] = useState("");

  async function refresh() {
    setLoading(true);
    const data = await listCarriers({ q, active: activeFilter, region: regionFilter });
    setItems(data);
    setLoading(false);
  }
  useEffect(() => { void refresh(); }, [q, activeFilter, regionFilter]);

  const stats = useMemo(() => ({
    total: items.length,
    active: items.filter(c => c.active).length,
    inactive: items.filter(c => !c.active).length
  }), [items]);

  async function handleCreate(v: Omit<Carrier, "id"|"createdAt"|"updatedAt">) {
    try { await createCarrier(v); setOpen(false); await refresh(); }
    catch (e:any) { setErr(e.message || "Lỗi tạo đơn vị giao hàng"); }
  }
  async function handleUpdate(v: Omit<Carrier, "id"|"createdAt"|"updatedAt">) {
    if (!editing) return;
    try { await updateCarrier(editing.id, v); setEditing(null); setOpen(false); await refresh(); }
    catch (e:any) { setErr(e.message || "Lỗi cập nhật"); }
  }

  return (
    <div className="p-4">
      <PageHeader
        title="🚚 Quản lý Đơn vị giao hàng"
        right={<Button variant="primary" onClick={() => { setEditing(null); setOpen(true); }}>+ Thêm đơn vị</Button>}
      />

      {/* Stats mini */}
      <div className="stats">
        <div className="stat"><div className="label">Tổng</div><div className="value">{stats.total}</div></div>
        <div className="stat"><div className="label">Đang bật</div><div className="value">{stats.active}</div></div>
        <div className="stat"><div className="label">Tắt</div><div className="value">{stats.inactive}</div></div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Input placeholder="Tìm tên, mã, ghi chú..." value={q} onChange={e=>setQ(e.target.value)} />
          <div className="pills">
            <Button onClick={()=>setActiveFilter("all")} className={`pill ${activeFilter==="all"?"active":""}`}>Tất cả</Button>
            <Button onClick={()=>setActiveFilter("active")} className={`pill ${activeFilter==="active"?"active":""}`}>Đang bật</Button>
            <Button onClick={()=>setActiveFilter("inactive")} className={`pill ${activeFilter==="inactive"?"active":""}`}>Tắt</Button>
            <span style={{width:1,height:24,background:"#eee",margin:"0 8px"}} />
            <Select value={regionFilter} onChange={e=>setRegionFilter(e.target.value as any)}>
              <option value="all">Tất cả khu vực</option>
              <option value="VN">Toàn quốc</option>
              <option value="HCM">Hồ Chí Minh</option>
              <option value="HN">Hà Nội</option>
              <option value="MID">Miền Trung</option>
              <option value="NORTH">Miền Bắc</option>
              <option value="SOUTH">Miền Nam</option>
              <option value="INTL">Quốc tế</option>
            </Select>
          </div>
        </div>
      </div>

      {err && <div className="p-2 bg-red-50 border text-red-700 text-sm my-2">{err}</div>}

      {/* Table */}
      <TableWrap>
        <div className="table-wrapper sticky">
          <table className="pretty">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Mã</th>
                <th>Phí cơ bản</th>
                <th>Phí/kg</th>
                <th>Khu vực</th>
                <th>SLA</th>
                <th>COD</th>
                <th>Trạng thái</th>
                <th style={{width:140}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="p-3 text-center text-gray-500">Đang tải...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={9} className="p-6 text-center text-gray-500">Không có đơn vị phù hợp</td></tr>
              ) : items.map(c => (
                <tr key={c.id}>
                  <td className="font-medium">{c.name}{c.note && <div className="text-xs text-gray-500">{c.note}</div>}</td>
                  <td><code>{c.code}</code></td>
                  <td>{c.baseFee.toLocaleString()} đ</td>
                  <td>{c.feePerKg.toLocaleString()} đ</td>
                  <td className="text-xs">
                    {c.regions.join(", ")}
                  </td>
                  <td>~{c.slaDays} ngày</td>
                  <td><Badge tone={c.codSupported ? "green" : "gray"}>{c.codSupported ? "Có" : "Không"}</Badge></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Switch checked={c.active} onChange={async v => { await toggleCarrier(c.id, v); void refresh(); }} />
                      <Badge tone={c.active ? "green" : "gray"}>{c.active ? "Đang bật" : "Tắt"}</Badge>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-6">
                      <button className="btn" onClick={() => { setEditing(c); setOpen(true); }}>Sửa</button>
                      <button className="btn-danger" onClick={async () => {
                        if (confirm("Xóa đơn vị này?")) { await deleteCarrier(c.id); void refresh(); }
                      }}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrap>

      {/* Modal create/edit */}
      <Modal
        open={open}
        title={editing ? "Cập nhật đơn vị giao hàng" : "Thêm đơn vị giao hàng"}
        onClose={() => { setOpen(false); setEditing(null); }}
      >
        <CarrierForm
          initial={editing ?? undefined}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => { setOpen(false); setEditing(null); }}
        />
      </Modal>
    </div>
  );
}
