import { createReducer, createAction, ActionType } from "typesafe-actions";

export const setCounterAction = createAction("INCREASE_COUNTER")<number>();

export const counterReducer = createReducer<number, ActionType<typeof setCounterAction>>(0)
.handleAction(setCounterAction, (_, action) => {
  return action.payload;
});
