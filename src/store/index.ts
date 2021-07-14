import {createStore, combineReducers} from 'redux';
import { counterReducer } from './counter';

export const globalState = combineReducers({
  counter: counterReducer
});

export type GlobalState = ReturnType<typeof globalState>;

export const store = createStore(globalState);