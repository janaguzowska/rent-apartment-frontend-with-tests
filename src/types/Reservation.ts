import {Offer} from './Offer.ts';
import {Tour} from './Tour.ts';

export interface Reservation {
  offer: Offer;
  participants: Participant[];
  insuranceId: number;
  tours: Tour[];
}
