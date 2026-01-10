import {Tour} from './Tour.ts';

export interface Reservation {
  offerId?: number;
  participants?: Participant[];
  insuranceId?: number;
  tours?: Tour[];
  checkIn?: Date;
  checkOut?: Date;
}
