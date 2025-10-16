export type RegionCode = "VN" | "HCM" | "HN" | "MID" | "NORTH" | "SOUTH" | "INTL";

export type Carrier = {
  id: string;
  name: string;        // Giao hàng nhanh
  code: string;        // GHN
  active: boolean;
  baseFee: number;     // phí cố định
  feePerKg: number;    // phí theo kg
  regions: RegionCode[];
  slaDays: number;     // thời gian giao dự kiến (ngày)
  codSupported: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
};
