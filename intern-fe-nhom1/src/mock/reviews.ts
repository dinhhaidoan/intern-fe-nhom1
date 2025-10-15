import type { Review, ReviewStatus, ReviewReply } from "@/types/review";

const KEY = "reviews";
const sleep = (ms=200)=> new Promise(res=>setTimeout(res, ms));
const nowIso = () => new Date().toISOString();

function read(): Review[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Review[]; }
  catch { return []; }
}
function write(data: Review[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function ensureSeed() {
  const data = read();
  if (data.length === 0) {
    const seed: Review[] = [
      { id: crypto.randomUUID(), productId: "p-iphone-15", productName: "iPhone 15 128GB",
        userName: "Nguyễn Văn A", rating: 5, comment: "Giao nhanh, hàng chuẩn!",
        createdAt: nowIso(), status: "approved", replies: [] },
      { id: crypto.randomUUID(), productId: "p-ss-s24", productName: "Galaxy S24",
        userName: "Trần B", rating: 3, comment: "Pin vừa đủ, camera ok.", 
        createdAt: nowIso(), status: "pending", replies: [] },
      { id: crypto.randomUUID(), productId: "p-xiaomi-13", productName: "Xiaomi 13",
        userName: "Lê C", rating: 1, comment: "Đóng gói ẩu. Không hài lòng.",
        createdAt: nowIso(), status: "pending", replies: [] }
    ];
    write(seed);
  }
}
ensureSeed();

export interface ReviewFilter {
  status?: ReviewStatus | "all";
  rating?: number | "all";
  q?: string;
}

export async function listReviews(filter?: ReviewFilter): Promise<Review[]> {
  await sleep();
  let items = read().sort((a,b)=> b.createdAt.localeCompare(a.createdAt));
  if (filter?.status && filter.status !== "all") items = items.filter(r=>r.status===filter.status);
  if (filter?.rating && filter.rating !== "all") items = items.filter(r=>r.rating===filter.rating);
  if (filter?.q && filter.q.trim()) {
    const q = filter.q.toLowerCase();
    items = items.filter(r=> r.productName.toLowerCase().includes(q) || r.userName.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q));
  }
  return items;
}

export async function setReviewStatus(id: string, status: ReviewStatus) {
  await sleep();
  const data = read();
  const idx = data.findIndex(r=>r.id===id);
  if (idx < 0) throw new Error("Không tìm thấy đánh giá");
  data[idx].status = status;
  write(data);
  return data[idx];
}

export async function deleteReview(id: string) {
  await sleep();
  write(read().filter(r=>r.id!==id));
  return { ok: true };
}

export async function replyReview(id: string, content: string, author: "admin"|"staff"="admin") {
  await sleep();
  const data = read();
  const idx = data.findIndex(r=>r.id===id);
  if (idx < 0) throw new Error("Không tìm thấy đánh giá");
  const reply: ReviewReply = { id: crypto.randomUUID(), author, content, createdAt: nowIso() };
  data[idx].replies.push(reply);
  write(data);
  return reply;
}
