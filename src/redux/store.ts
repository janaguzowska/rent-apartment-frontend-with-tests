import { createStore } from '@reduxjs/toolkit';
import { reducers } from './reducers.ts';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(reducers, composeWithDevTools());
