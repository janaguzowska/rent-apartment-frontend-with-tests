import {PayloadAction} from '@reduxjs/toolkit';
import {ActionPayload} from '../types/ActionPayload.ts';
import {ActionType} from '../types/ActionType.ts';
import {Review} from '../types/Review.ts';

interface ReviewState {
  reviews: Review[];
}

const defaultState: ReviewState = ({
  reviews: []
});

export const reviewReducer = (state: ReviewState = defaultState, action: PayloadAction<ActionPayload, ActionType>): ReviewState => {
  switch (action.type) {
    case ActionType.AddReview:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.review!],
      };

    default:
      return state;
  }
};
