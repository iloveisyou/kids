import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of } from "rxjs";
import {
  getSampleFailure,
  getSampleSuccess,
  GET_SAMPLE,
  GET_SAMPLE_FAILURE,
  GET_SAMPLE_SUCCESS,
} from "../actions/sample";
import { api } from "../axios";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const sampleEpic = {
  getSample: (action$) =>
    action$.pipe(
      ofType(GET_SAMPLE),
      mergeMap(() =>
        from(api.get("/users?page=2")).pipe(
          map((response) => getSampleSuccess(response.data)),
          catchError((err) => of(getSampleFailure(err)))
        )
      )
    ),
};

const sample = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAMPLE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_SAMPLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case GET_SAMPLE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default sample;
