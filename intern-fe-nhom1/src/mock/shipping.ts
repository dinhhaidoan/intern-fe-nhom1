import type { Carrier, RegionCode } from "@/types/shipping";

let CARRIERS: Carrier[] = [
  {
    id: "c-ghn",
    name: "Giao Hàng Nhanh",
    code: "GHN",
    active: true,
    baseFee: 20000,
    feePerKg: 6000,
    regions: ["VN", "HCM", "HN"],
    slaDays: 2,
    codSupported: true,
    note: "Phổ biến, nhanh nội thành",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "c-ghtk",
    name: "Giao Hàng Tiết Kiệm",
    code: "GHTK",
    active: true,
    baseFee: 18000,
    feePerKg: 5500,
    regions: ["VN", "SOUTH", "NORTH"],
    slaDays: 3,
    codSupported: true,
    note: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "c-jt",
    name: "J&T Express",
    code: "JT",
    active: false,
    baseFee: 25000,
    feePerKg: 7000,
    regions: ["VN", "MID", "NORTH", "SOUTH"],
    slaDays: 3,
    codSupported: true,
    note: "Tạm dừng test",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function delay<T>(data: T, ms = 250) {
  return new Promise<T>(res => setTimeout(() => res(data), ms));
}

export async function listCarriers(params?: {
  q?: string;
  active?: "all" | "active" | "inactive";
  region?: "all" | RegionCode;
}) {
  let arr = [...CARRIERS];
  const q = params?.q?.trim().toLowerCase() ?? "";
  if (q) arr = arr.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.code.toLowerCase().includes(q) ||
    c.note?.toLowerCase().includes(q)
  );
  if (params?.active && params.active !== "all") {
    arr = arr.filter(c => params.active === "active" ? c.active : !c.active);
  }
  if (params?.region && params.region !== "all") {
    arr = arr.filter(c => c.regions.includes(params.region as RegionCode));
  }
  arr.sort((a,b) => a.name.localeCompare(b.name));
  return delay(arr);
}

export async function createCarrier(v: Omit<Carrier, "id"|"createdAt"|"updatedAt">) {
  const now = new Date().toISOString();
  const id = `c-${Math.random().toString(36).slice(2,8)}`;
  const row: Carrier = { ...v, id, createdAt: now, updatedAt: now };
  CARRIERS.unshift(row);
  return delay(row);
}

export async function updateCarrier(id: string, v: Omit<Carrier, "id"|"createdAt"|"updatedAt">) {
  const i = CARRIERS.findIndex(c => c.id === id);
  if (i < 0) throw new Error("Không tìm thấy carrier");
  CARRIERS[i] = { ...CARRIERS[i], ...v, updatedAt: new Date().toISOString() };
  return delay(CARRIERS[i]);
}

export async function deleteCarrier(id: string) {
  CARRIERS = CARRIERS.filter(c => c.id !== id);
  return delay(true);
}

export async function toggleCarrier(id: string, active: boolean) {
  const i = CARRIERS.findIndex(c => c.id === id);
  if (i < 0) throw new Error("Không tìm thấy carrier");
  CARRIERS[i].active = active;
  CARRIERS[i].updatedAt = new Date().toISOString();
  return delay(CARRIERS[i]);
}
