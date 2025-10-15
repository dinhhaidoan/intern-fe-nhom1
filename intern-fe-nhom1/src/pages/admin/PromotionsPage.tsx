import { useEffect, useMemo, useState } from "react";
import { createPromotion, deletePromotion, listPromotions, toggleActive, updatePromotion } from "@/mock/promos";
import type { Promotion } from "@/types/promo";
import PromotionForm from "@/components/admin/PromotionForm";
import { PageHeader, TableWrap } from "@/components/ui/Page";
import { Button, Input } from "@/components/ui/Controls";
import { Badge } from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Pill from "@/components/ui/Pill";
import Switch from "@/components/ui/Switch";

export default function PromotionsPage() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [open, setOpen] = useState(false);
  const [scopeFilter, setScopeFilter] = useState<"all" | "global" | "category" | "product">("all");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    const data = await listPromotions();
    setItems(data);
    setLoading(false);
  }
  useEffect(() => { void refresh(); }, []);

  const filtered = useMemo(() => {
    let arr = [...items];
    const keyword = q.trim().toLowerCase();
    if (keyword) {
      arr = arr.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.code.toLowerCase().includes(keyword) ||
        p.scope.toLowerCase().includes(keyword)
      );
    }
    if (scopeFilter !== "all") arr = arr.filter(p => p.scope === scopeFilter);
    if (activeFilter !== "all") arr = arr.filter(p => activeFilter === "active" ? p.active : !p.active);
    return arr;
  }, [items, q, scopeFilter, activeFilter]);

  const now = Date.now();
  const stats = useMemo(() => {
    const active = items.filter(p => p.active && new Date(p.endDate).getTime() >= now).length;
    const upcoming = items.filter(p => new Date(p.startDate).getTime() > now).length;
    const expired = items.filter(p => new Date(p.endDate).getTime() < now).length;
    return { active, upcoming, expired, total: items.length };
  }, [items, now]);

  async function handleCreate(v: Omit<Promotion, "id" | "createdAt" | "updatedAt" | "usedCount">) {
    try {
      await createPromotion(v);
      setOpen(false);
      await refresh();
    } catch (e: any) {
      setError(e.message || "Lỗi tạo khuyến mãi");
    }
  }

  async function handleUpdate(v: Omit<Promotion, "id" | "createdAt" | "updatedAt" | "usedCount">) {
    if (!editing) return;
    try {
      await updatePromotion(editing.id, v);
      setEditing(null);
      setOpen(false);
      await refresh();
    } catch (e: any) {
      setError(e.message || "Lỗi cập nhật khuyến mãi");
    }
  }

  return (
    <div className="p-4 promo-page">

      <PageHeader
        title="🎯 Quản lý Khuyến mãi"
        right={<Button variant="primary" onClick={() => { setEditing(null); setOpen(true); }}>+ Tạo khuyến mãi</Button>}
      />

      {/* Stats */}
      <div className="stats">
        <div className="stat">
          <div className="label">Đang chạy</div>
          <div className="value">{stats.active}</div>
        </div>
        <div className="stat">
          <div className="label">Sắp diễn ra</div>
          <div className="value">{stats.upcoming}</div>
        </div>
        <div className="stat">
          <div className="label">Hết hạn</div>
          <div className="value">{stats.expired}</div>
        </div>
      </div>

      {/* Filters — chỉ thêm class để ăn CSS đẹp, không đổi logic */}
      <div className="promo-toolbar">
        <div className="row">
          <Input
            className="search"
            placeholder="Tìm theo tên, mã, phạm vi..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />

          {/* Phạm vi */}
          <Pill active={scopeFilter === "all"} onClick={() => setScopeFilter("all")}>Tất cả phạm vi</Pill>
          <Pill active={scopeFilter === "global"} onClick={() => setScopeFilter("global")}>Global</Pill>
          <Pill active={scopeFilter === "category"} onClick={() => setScopeFilter("category")}>Danh mục</Pill>
          <Pill active={scopeFilter === "product"} onClick={() => setScopeFilter("product")}>Sản phẩm</Pill>

          {/* ngăn cách nhỏ */}
          <span style={{ width: 1, height: 24, background: "#eee", margin: "0 8px" }} />

          {/* Trạng thái */}
          <Pill active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>Tất cả</Pill>
          <Pill active={activeFilter === "active"} onClick={() => setActiveFilter("active")}>Đang chạy</Pill>
          <Pill active={activeFilter === "inactive"} onClick={() => setActiveFilter("inactive")}>Tắt</Pill>
        </div>
      </div>
      <div className="promo-spacer" />

      {error && <div className="p-2 bg-red-50 border text-red-700 text-sm my-2">{error}</div>}

      {/* Table */}
      <TableWrap>
        <div className="table-wrapper sticky">
          <table className="pretty">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Mã</th>
                <th>Loại</th>
                <th>Giá trị</th>
                <th>Phạm vi</th>
                <th>Thời gian</th>
                <th>Điều kiện</th>
                <th>Trạng thái</th>
                <th style={{ width: 140 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="p-3 text-center text-gray-500">Đang tải...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={9} className="p-6 text-center text-gray-500">Không tìm thấy khuyến mãi phù hợp.</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id}>
                  <td className="font-medium">{p.name}</td>
                  <td><code>{p.code}</code></td>
                  <td>{p.type === "percent" ? "Phần trăm" : "Cố định"}</td>
                  <td>{p.type === "percent" ? `${p.value}%` : `${p.value.toLocaleString()} đ`}</td>
                  <td className="capitalize">
                    {p.scope}
                    {p.scope !== "global" && p.scopeIds.length > 0 && (
                      <div className="text-xs text-gray-500">[{p.scopeIds.join(", ")}]</div>
                    )}
                  </td>
                  <td>{new Date(p.startDate).toLocaleDateString()} → {new Date(p.endDate).toLocaleDateString()}</td>
                  <td>
                    {p.minOrderValue ? `Tối thiểu ${p.minOrderValue.toLocaleString()} đ` : "-"}
                    <br />
                    {p.usageLimit ? `Lượt dùng: ${p.usedCount ?? 0}/${p.usageLimit}` : ""}
                  </td>
                  <td>
                    <Switch checked={p.active} onChange={async v => { await toggleActive(p.id, v); void refresh(); }} />
                    <span className="ml-2">
                      <Badge tone={p.active ? "green" : "gray"}>{p.active ? "Đang chạy" : "Tắt"}</Badge>
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-6">
                      <button className="btn" onClick={() => { setEditing(p); setOpen(true); }}>Sửa</button>
                      <button
                        className="btn-danger"
                        onClick={async () => {
                          if (confirm("Xóa khuyến mãi này?")) { await deletePromotion(p.id); void refresh(); }
                        }}
                      >
                        Xóa
                      </button>
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
        title={editing ? "Cập nhật khuyến mãi" : "Tạo khuyến mãi mới"}
        onClose={() => { setOpen(false); setEditing(null); }}
      >
        {/* Bọc form bằng promo-modal để ăn style modal mới, không đổi overlay/backdrop */}
        <div className="promo-modal">
          <div className="body">
            <PromotionForm
              initial={editing}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={() => { setOpen(false); setEditing(null); }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
