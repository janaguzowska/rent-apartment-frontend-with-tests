import {PayloadAction} from '@reduxjs/toolkit';
import {ActionPayload} from '../types/ActionPayload.ts';
import {ActionType} from '../types/ActionType.ts';
import {Reservation} from '../types/Reservation.ts';

interface ReservationState {
  reservation: Reservation;
}

const defaultState: ReservationState = ({
  reservation: {
    participants: [{firstName: '', lastName: ''}],
    insuranceId: undefined,
    tours: [],
  }
});

export const reservationReducer = (state: ReservationState = defaultState, action: PayloadAction<ActionPayload, ActionType>) => {
  switch (action.type) {
    case ActionType.SetReservation:
      return {...state, reservation: action.payload.reservation!};

    default:
      return state;
  }
};
