import {User} from './User.ts';
import {Offer} from './Offer.ts';

export interface Review {
  id: number;
  offerId: number;
  userName: string;
  userAvatar: string;
  rating: number; // 1–5
  description: string;
  creationDate?: string; // np. ISO string
  user?: User;
  offer?: Offer;
}
