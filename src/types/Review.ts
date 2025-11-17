export interface Review {
  id: number;
  offerId: number;
  userName: string;
  userAvatar: string;
  rating: number; // 1–5
  description: string;
  date: string; // np. ISO string
}
