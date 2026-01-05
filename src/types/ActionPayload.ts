import {Offer} from './Offer.ts';
import {Review} from './Review.ts';
import {User} from './User.ts';
import {SearchBarParams} from './SearchBarParams.ts';

export interface ActionPayload {
  offers?: Offer[];
  currentOffer?: Offer;
  id?: number;
  review?: Review;
  user?: User;
  searchBarParams?: SearchBarParams;
}
