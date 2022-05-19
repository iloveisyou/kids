import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";
import sample, { sampleEpic } from "./sample";

export const rootEpic = combineEpics(...Object.values(sampleEpic));
export const reducer = (state, action) => {
  const combinedReducer = combineReducers({
    sample,
  });
  return combinedReducer(state, action);
};
