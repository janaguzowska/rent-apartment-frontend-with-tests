import {Offer} from './Offer.ts';

export interface Reservation {
  offer: Offer;
  participants: Participant[];
  insuranceId: number;
  tourIds: number[];
}
