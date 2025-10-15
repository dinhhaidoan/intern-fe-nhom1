export type ReviewStatus = "pending" | "approved" | "rejected" | "hidden";

export interface ReviewReply {
  id: string;
  author: "admin" | "staff";
  content: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
  status: ReviewStatus;
  replies: ReviewReply[];
}
