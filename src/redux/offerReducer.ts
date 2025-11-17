import {Offer} from '../types/Offer.ts';
import {PayloadAction} from '@reduxjs/toolkit';
import {ActionPayload} from '../types/ActionPayload.ts';
import {ActionType} from '../types/ActionType.ts';

interface OfferState {
  offers: Offer[];
  currentOffer?: Offer;
}

const defaultState: OfferState = ({
  offers: []
});
export const offerReducer = (state: OfferState = defaultState, action: PayloadAction<ActionPayload, ActionType>) => {
  switch (action.type) {
    case ActionType.SetOffers:
      return {...state, offers: action.payload.offers!};
    case ActionType.ToggleFavorite:
      return {
        ...state, offers: state.offers.map((offerItem) => ({
          ...offerItem,
          isFavorite: offerItem.id === action.payload.currentOffer?.id ? !offerItem.isFavorite : offerItem.isFavorite
        }))
      };
    case ActionType.SetCurrentOffer:
      return {...state, currentOffer: state.offers.find((offer) => offer.id === Number(action.payload.id))};
    default:
      return state;
  }
};
