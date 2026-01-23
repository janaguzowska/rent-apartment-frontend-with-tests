import {Tour} from './Tour.ts';
import {Participant} from './Participant.ts';
import {Offer} from './Offer.ts';
import {Insurance} from './Insurance.ts';

export interface Reservation extends NewReservation {
  id: number;
  offer: Offer;
  tours: Tour[];
  insurance?: Insurance;
}

export interface NewReservation {
  offerId?: number;
  participants: Participant[];
  insuranceId?: number;
  tourIds?: number[];
  checkIn?: Date;
  checkOut?: Date;
}
