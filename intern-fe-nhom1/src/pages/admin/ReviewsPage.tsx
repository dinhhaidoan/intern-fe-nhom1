import { useEffect, useMemo, useState } from "react";
import { deleteReview, listReviews, replyReview, setReviewStatus } from "@/mock/reviews";
import type { Review, ReviewStatus } from "@/types/review";
import { PageHeader, TableWrap } from "@/components/ui/Page";
import { Button, Input, Select } from "@/components/ui/Controls";
import { Badge } from "@/components/ui/Badge";

export default function ReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<ReviewStatus | "all">("all");
  const [rating, setRating] = useState<number | "all">("all");
  const [q, setQ] = useState<string>("");
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  const counters = useMemo(() => {
    const total = items.length;
    const byStatus = items.reduce<Record<ReviewStatus, number>>((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {} as Record<ReviewStatus, number>);
    return { total, byStatus };
  }, [items]);

  async function refresh() {
    setLoading(true);
    const data = await listReviews({ status, rating, q });
    setItems(data);
    setLoading(false);
  }
  useEffect(() => { void refresh(); }, [status, rating, q]);

  async function changeStatus(id: string, s: ReviewStatus) {
    await setReviewStatus(id, s);
    await refresh();
  }

  async function submitReply() {
    if (!replyingId || !replyContent.trim()) return;
    await replyReview(replyingId, replyContent.trim(), "admin");
    setReplyContent(""); setReplyingId(null);
    await refresh();
  }

  const badgeTone = (s: ReviewStatus) =>
    s === "approved" ? "green" :
    s === "pending"  ? "yellow" :
    s === "hidden"   ? "gray" : "red";

  return (
    <div className="p-4 reviews-page">
      <PageHeader title="⭐ Đánh giá & Bình luận" />

      {/* Toolbar lọc: chỉ thêm wrapper/class để ăn CSS, không đổi logic */}
      <div className="reviews-toolbar">
        <div className="row">
          <Select
            className="ctl"
            value={status}
            onChange={e => setStatus(e.target.value as ReviewStatus | "all")}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
            <option value="hidden">Ẩn</option>
          </Select>

          <Select
            className="ctl"
            value={String(rating)}
            onChange={e => setRating(e.target.value === "all" ? "all" : Number(e.target.value))}
          >
            <option value="all">Tất cả rating</option>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} sao</option>)}
          </Select>

          <Input
            className="ctl search"
            placeholder="Tìm sản phẩm, user, nội dung..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>
      <div className="rv-spacer" />

      {/* Counters */}
      <div className="flex gap-3 text-sm mb-2">
        <span className="badge badge-gray">Tổng: {counters.total}</span>
        <span className="badge badge-yellow">Chờ duyệt: {counters.byStatus?.pending ?? 0}</span>
        <span className="badge badge-green">Đã duyệt: {counters.byStatus?.approved ?? 0}</span>
        <span className="badge badge-red">Từ chối: {counters.byStatus?.rejected ?? 0}</span>
        <span className="badge badge-gray">Ẩn: {counters.byStatus?.hidden ?? 0}</span>
      </div>

      <TableWrap>
        <table className="pretty reviews-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Người dùng</th>
              <th>Rating</th>
              <th>Nội dung</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-3 text-center text-gray-500">Đang tải...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="p-3 text-center text-gray-500">Không có đánh giá phù hợp</td></tr>
            ) : items.map(r => (
              <tr key={r.id}>
                {/* Sản phẩm */}
                <td className="prod">
                  <div className="font-medium">{r.productName}</div>
                  <div className="sku">{r.productId}</div>
                </td>

                {/* User */}
                <td>{r.userName}</td>

                {/* Rating */}
                <td>
                  <span className="stars">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </td>

                {/* Nội dung + trả lời */}
                <td className="rv-content">
                  <p>{r.comment}</p>

                  {r.replies.length > 0 && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs border text-gray-700">
                      <div className="font-medium mb-1">Phản hồi</div>
                      {r.replies.map(rep => (
                        <div key={rep.id} className="mb-1">
                          <span className="badge badge-gray mr-1">{rep.author}</span>
                          {rep.content}
                        </div>
                      ))}
                    </div>
                  )}

                  {replyingId === r.id ? (
                    <div className="mt-2 flex gap-2">
                      <Input
                        className="flex-1 text-sm"
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder="Phản hồi của admin..."
                      />
                      <Button variant="primary" onClick={submitReply}>Gửi</Button>
                      <Button onClick={() => { setReplyingId(null); setReplyContent(""); }}>Hủy</Button>
                    </div>
                  ) : (
                    <button className="chip chip-outline" onClick={() => setReplyingId(r.id)}>Trả lời</button>
                  )}
                </td>

                {/* Thời gian */}
                <td>{new Date(r.createdAt).toLocaleString()}</td>

                {/* Trạng thái */}
                <td><Badge tone={badgeTone(r.status) as any}>{r.status}</Badge></td>

                {/* Hành động */}
                <td>
                  <div className="cell-actions">
                    {r.status !== "approved" && (
                      <Button onClick={() => void changeStatus(r.id, "approved")}>Duyệt</Button>
                    )}
                    {r.status !== "hidden" && (
                      <Button onClick={() => void changeStatus(r.id, "hidden")}>Ẩn</Button>
                    )}
                    {r.status !== "rejected" && (
                      <Button onClick={() => void changeStatus(r.id, "rejected")}>Từ chối</Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={async () => {
                        if (confirm("Xóa đánh giá này?")) { await deleteReview(r.id); await refresh(); }
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </div>
  );
}
