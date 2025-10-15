import type { Promotion } from "@/types/promo";

const KEY = "promotions";

function read(): Promotion[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Promotion[]; }
  catch { return []; }
}
function write(data: Promotion[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
const sleep = (ms=200)=> new Promise(res=>setTimeout(res, ms));
const nowIso = () => new Date().toISOString();

function ensureSeed() {
  const data = read();
  if (data.length === 0) {
    const seed: Promotion[] = [
      {
        id: crypto.randomUUID(),
        name: "T10 SALE 10%",
        code: "OCT10",
        type: "percent",
        value: 10,
        startDate: new Date(Date.now() - 86400000*7).toISOString(),
        endDate: new Date(Date.now() + 86400000*14).toISOString(),
        active: true,
        scope: "global",
        scopeIds: [],
        minOrderValue: 300000,
        usageLimit: 500,
        usedCount: 42,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      }
    ];
    write(seed);
  }
}
ensureSeed();

export async function listPromotions(): Promise<Promotion[]> {
  await sleep();
  return read().sort((a,b)=> b.createdAt.localeCompare(a.createdAt));
}

export async function createPromotion(input: Omit<Promotion, "id"|"createdAt"|"updatedAt"|"usedCount">) {
  await sleep();
  const data = read();
  const exists = data.some(p => p.code.toUpperCase() === input.code.toUpperCase());
  if (exists) throw new Error("Mã khuyến mãi đã tồn tại");

  const item: Promotion = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    usedCount: input.usedCount ?? 0
  };
  data.unshift(item);
  write(data);
  return item;
}

export async function updatePromotion(id: string, patch: Partial<Promotion>) {
  await sleep();
  const data = read();
  const idx = data.findIndex(p=>p.id===id);
  if (idx < 0) throw new Error("Không tìm thấy khuyến mãi");
  // nếu đổi code, kiểm tra trùng
  if (patch.code && patch.code.toUpperCase() !== data[idx].code.toUpperCase()) {
    const dup = data.some(p => p.code.toUpperCase() === patch.code!.toUpperCase());
    if (dup) throw new Error("Mã khuyến mãi đã tồn tại");
  }
  data[idx] = { ...data[idx], ...patch, updatedAt: nowIso() };
  write(data);
  return data[idx];
}

export async function deletePromotion(id: string) {
  await sleep();
  write(read().filter(p=>p.id!==id));
  return { ok: true };
}

export async function toggleActive(id: string, active: boolean) {
  return updatePromotion(id, { active });
}
