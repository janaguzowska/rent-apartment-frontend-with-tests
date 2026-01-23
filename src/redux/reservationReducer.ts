import {PayloadAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/ActionType.ts';
import {NewReservation, Reservation} from '../types/Reservation.ts';

interface ReservationState {
  reservation: NewReservation;
  reservations: Reservation[];
}

const defaultState: ReservationState = ({
  reservation: {
    participants: [{firstName: '', lastName: ''}],
    insuranceId: undefined,
    tourIds: [],
  },
  reservations: [],
});

export const reservationReducer = (state: ReservationState = defaultState, action: PayloadAction<ReservationState, ActionType>) => {
  switch (action.type) {
    case ActionType.SetReservation:
      return {...state, reservation: action.payload.reservation};
    case ActionType.SetUserReservations:
      return {...state, reservations: action.payload.reservations};
    default:
      return state;
  }
};
