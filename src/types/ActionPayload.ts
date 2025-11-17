import {Offer} from './Offer.ts';
import {Review} from './Review.ts';

export interface ActionPayload {
  offers?: Offer[];
  currentOffer?: Offer;
  id?: number;
  review?: Review;
}
