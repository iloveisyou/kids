export const GET_SAMPLE = `GET_SAMPLE`;
export const GET_SAMPLE_SUCCESS = `GET_SAMPLE_SUCCESS`;
export const GET_SAMPLE_FAILURE = `GET_SAMPLE_FAILURE`;

// Actions creators
export const getSample = (payload) => ({
  type: GET_SAMPLE,
  payload,
  meta: {
    promise: {
      resolve: GET_SAMPLE_SUCCESS,
      reject: GET_SAMPLE_FAILURE,
    },
  },
});

export const getSampleSuccess = (response) => ({
  type: GET_SAMPLE_SUCCESS,
  payload: { response },
});
export const getSampleFailure = (error) => ({
  type: GET_SAMPLE_FAILURE,
  payload: error,
});
