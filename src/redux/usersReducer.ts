import {User} from '../types/User.ts';
import {PayloadAction} from '@reduxjs/toolkit';
import {ActionPayload} from '../types/ActionPayload.ts';
import {ActionType} from '../types/ActionType.ts';

export interface UsersState {
  users: User[];
}

const defaultState: UsersState = ({
  users: [],
});

export const usersReducer = (state = defaultState, action: PayloadAction<ActionPayload, ActionType>): UsersState => {
  switch (action.type) {
    case ActionType.setUsers:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
