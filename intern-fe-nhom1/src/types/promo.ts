export type PromoType = "percent" | "fixed";
export type PromoScope = "global" | "category" | "product";

export interface Promotion {
  id: string;
  name: string;
  code: string;              // mã giảm giá
  type: PromoType;           // percent | fixed
  value: number;             // % hoặc số tiền
  startDate: string;         // ISO
  endDate: string;           // ISO
  active: boolean;
  scope: PromoScope;         // phạm vi áp dụng
  scopeIds: string[];        // danh sách id category/product; rỗng nếu global
  minOrderValue?: number;    // điều kiện tối thiểu
  usageLimit?: number;       // giới hạn tổng lượt dùng
  usedCount?: number;        // đã dùng
  createdAt: string;
  updatedAt: string;
}
