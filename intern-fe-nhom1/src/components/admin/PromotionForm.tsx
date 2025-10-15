import { useMemo, useState } from "react";
import type { Promotion, PromoScope, PromoType } from "@/types/promo";
import Switch from "@/components/ui/Switch";
import { Button } from "@/components/ui/Controls";

type Props = {
  initial?: Promotion | null;
  onSubmit: (values: Omit<Promotion, "id" | "createdAt" | "updatedAt" | "usedCount">) => void;
  onCancel?: () => void;
};

export default function PromotionForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [code, setCode] = useState(initial?.code ?? "");
  const [type, setType] = useState<PromoType>(initial?.type ?? "percent");
  const [value, setValue] = useState<number>(initial?.value ?? 10);
  const [active, setActive] = useState<boolean>(initial?.active ?? true);
  const [startDate, setStartDate] = useState<string>((initial?.startDate ?? new Date().toISOString()).slice(0, 16));
  const [endDate, setEndDate] = useState<string>((initial?.endDate ?? new Date(Date.now() + 7 * 864e5).toISOString()).slice(0, 16));
  const [scope, setScope] = useState<PromoScope>(initial?.scope ?? "global");
  const [scopeIds, setScopeIds] = useState<string>((initial?.scopeIds ?? []).join(","));
  const [minOrderValue, setMinOrderValue] = useState<number>(initial?.minOrderValue ?? 0);
  const [usageLimit, setUsageLimit] = useState<number>(initial?.usageLimit ?? 0);

  const canSubmit = useMemo(() => {
    if (!name.trim() || !code.trim()) return false;
    if (type === "percent" && (value <= 0 || value > 100)) return false;
    if (type === "fixed" && value <= 0) return false;
    return new Date(startDate) < new Date(endDate);
  }, [name, code, type, value, startDate, endDate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      type, value, active,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      scope,
      scopeIds: scope === "global" ? [] : scopeIds.split(",").map(s => s.trim()).filter(Boolean),
      minOrderValue: minOrderValue || undefined,
      usageLimit: usageLimit || undefined,
      usedCount: initial?.usedCount ?? 0
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div>
        <label className="text-sm">Tên chương trình</label>
        <input className="border p-2 rounded w-full" value={name} onChange={e => setName(e.target.value)} required />
        <div className="help">Ví dụ: “Black Friday 20%”</div>
      </div>

      <div>
        <label className="text-sm">Mã code</label>
        <input className="border p-2 rounded w-full uppercase" value={code} onChange={e => setCode(e.target.value)} required />
        <div className="help">Chỉ chữ/số, không dấu cách. Ví dụ: BF20</div>
      </div>

      <div>
        <label className="text-sm">Loại giảm</label>
        <select className="border p-2 rounded w-full" value={type} onChange={e => setType(e.target.value as PromoType)}>
          <option value="percent">Phần trăm (%)</option>
          <option value="fixed">Số tiền cố định</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Giá trị</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
        />
        <div className="help">{type === "percent" ? "0 < % ≤ 100" : "Số tiền giảm (đ)"}</div>
      </div>

      <div>
        <label className="text-sm">Bắt đầu</label>
        <input type="datetime-local" className="border p-2 rounded w-full" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>

      <div>
        <label className="text-sm">Kết thúc</label>
        <input type="datetime-local" className="border p-2 rounded w-full" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>

      <div className="full">
        <Switch checked={active} onChange={setActive} label="Đang kích hoạt" />
      </div>

      <div>
        <label className="text-sm">Phạm vi áp dụng</label>
        <select className="border p-2 rounded w-full" value={scope} onChange={e => setScope(e.target.value as PromoScope)}>
          <option value="global">Toàn hệ thống</option>
          <option value="category">Theo danh mục</option>
          <option value="product">Theo sản phẩm</option>
        </select>
      </div>

      <div>
        <label className="text-sm">IDs áp dụng</label>
        <input
          className="border p-2 rounded w-full"
          value={scopeIds}
          onChange={e => setScopeIds(e.target.value)}
          disabled={scope === "global"}
          placeholder="vd: iphone, samsung, p-123"
        />
        <div className="help">Phân tách bằng dấu phẩy. Bỏ trống nếu “Toàn hệ thống”.</div>
      </div>

      <div>
        <label className="text-sm">Giá trị đơn tối thiểu (đ)</label>
        <input type="number" className="border p-2 rounded w-full" value={minOrderValue} onChange={e => setMinOrderValue(Number(e.target.value))} />
      </div>

      <div>
        <label className="text-sm">Giới hạn lượt dùng</label>
        <input type="number" className="border p-2 rounded w-full" value={usageLimit} onChange={e => setUsageLimit(Number(e.target.value))} />
      </div>

      <div className="full flex gap-8 pt-2">
        <Button variant="primary" disabled={!canSubmit}>Lưu</Button>
        {onCancel && <Button type="button" onClick={onCancel}>Hủy</Button>}
      </div>
    </form>
  );
}
