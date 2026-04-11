import { ActionType } from '../types/ActionType.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { ActionPayload } from '../types/ActionPayload.ts';
import { User } from '../types/User.ts';

export interface AuthState {
  isAuthorized: boolean;
  user?: User;
}

const defaultState: AuthState = {
  isAuthorized: false,
};

export const authReducer = (
  state = defaultState,
  action: PayloadAction<ActionPayload, ActionType>,
): AuthState => {
  switch (action.type) {
    case ActionType.setUser:
      return {
        ...state,
        isAuthorized: true,
        user: action.payload.user,
      };
    case ActionType.Logout:
      return defaultState;
    default:
      return state;
  }
};
