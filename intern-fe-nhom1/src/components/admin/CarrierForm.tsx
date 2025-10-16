import { useMemo, useState } from "react";
import type { Carrier, RegionCode } from "@/types/shipping";
import { Button } from "@/components/ui/Controls";
import Switch from "@/components/ui/Switch";

type Props = {
  initial?: Carrier | null;
  onSubmit: (v: Omit<Carrier, "id"|"createdAt"|"updatedAt">) => void;
  onCancel?: () => void;
};

const ALL_REGIONS: { value: RegionCode; label: string }[] = [
  { value: "VN", label: "Toàn quốc" },
  { value: "HCM", label: "Hồ Chí Minh" },
  { value: "HN",  label: "Hà Nội" },
  { value: "MID", label: "Miền Trung" },
  { value: "NORTH", label: "Miền Bắc" },
  { value: "SOUTH", label: "Miền Nam" },
  { value: "INTL", label: "Quốc tế" },
];

export default function CarrierForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [code, setCode] = useState(initial?.code ?? "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [baseFee, setBaseFee] = useState<number>(initial?.baseFee ?? 20000);
  const [feePerKg, setFeePerKg] = useState<number>(initial?.feePerKg ?? 6000);
  const [regions, setRegions] = useState<RegionCode[]>(initial?.regions ?? ["VN"]);
  const [slaDays, setSlaDays] = useState<number>(initial?.slaDays ?? 3);
  const [codSupported, setCodSupported] = useState<boolean>(initial?.codSupported ?? true);
  const [note, setNote] = useState(initial?.note ?? "");

  const canSubmit = useMemo(() => {
    return !!name.trim() && !!code.trim() && baseFee >= 0 && feePerKg >= 0 && regions.length > 0 && slaDays > 0;
  }, [name, code, baseFee, feePerKg, regions, slaDays]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      active,
      baseFee,
      feePerKg,
      regions,
      slaDays,
      codSupported,
      note: note.trim() || undefined,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
      updatedAt: initial?.updatedAt ?? new Date().toISOString(),
      id: initial?.id ?? "tmp", // sẽ bị bỏ khi create
    } as any);
  }

  function toggleRegion(r: RegionCode) {
    setRegions(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div>
        <label className="text-sm">Tên đơn vị</label>
        <input className="border p-2 rounded w-full" value={name} onChange={e=>setName(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm">Mã code</label>
        <input className="border p-2 rounded w-full uppercase" value={code} onChange={e=>setCode(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm">Phí cơ bản (đ)</label>
        <input type="number" className="border p-2 rounded w-full" value={baseFee} onChange={e=>setBaseFee(Number(e.target.value))} />
      </div>
      <div>
        <label className="text-sm">Phí theo kg (đ/kg)</label>
        <input type="number" className="border p-2 rounded w-full" value={feePerKg} onChange={e=>setFeePerKg(Number(e.target.value))} />
      </div>

      <div>
        <label className="text-sm">SLA dự kiến (ngày)</label>
        <input type="number" className="border p-2 rounded w-full" value={slaDays} onChange={e=>setSlaDays(Number(e.target.value))} />
      </div>
      <div>
        <label className="text-sm">Ghi chú</label>
        <input className="border p-2 rounded w-full" value={note} onChange={e=>setNote(e.target.value)} placeholder="ví dụ: nội thành HCM nhanh" />
      </div>

      <div className="full">
        <label className="text-sm block mb-1">Khu vực áp dụng</label>
        <div className="pills">
          {ALL_REGIONS.map(r => (
            <button
              type="button"
              key={r.value}
              className={`pill ${regions.includes(r.value) ? "active" : ""}`}
              onClick={() => toggleRegion(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="full flex items-center gap-6">
        <Switch checked={active} onChange={setActive} label="Đang kích hoạt" />
        <Switch checked={codSupported} onChange={setCodSupported} label="Hỗ trợ COD" />
      </div>

      <div className="full actions">
        <Button variant="primary" disabled={!canSubmit}>Lưu</Button>
        {onCancel && <Button type="button" onClick={onCancel}>Hủy</Button>}
      </div>
    </form>
  );
}
