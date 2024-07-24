import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CREATE_RESULT_API, DELETE_RESULT_API, RESULTS_API, UPDATE_RESULT_API } from 'store/types';

import { IResultData } from 'utils/types';

interface IResultState {
  results: IResultData[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: IResultState = {
  results: [],
  loading: false,
  error: null,
  fetched: false,
};

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    fetchResultsStarted(state) {
      state.loading = true;
      state.error = null;
    },
    fetchResultsFulfilled(state, action: PayloadAction<IResultData[]>) {
      state.loading = false;
      state.results = action.payload;
      state.error = null;
      state.fetched = true;
    },
    fetchResultsRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createResultStarted(state) {      
      state.loading = true;
      state.error = null;
    },
    createResultFulfilled(state, action: PayloadAction<IResultData>) {
      state.loading = false;
      state.results.push(action.payload);
      state.error = null;
    },
    createResultRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateResultStarted(state) {
      state.loading = true;
      state.error = null;
    },
    updateResultFulfilled(state, action: PayloadAction<IResultData>) {
      state.loading = false;
      state.results = state.results.map((result) =>
        result._id === action.payload._id ? action.payload : result
      );
      state.error = null;
    },
    updateResultRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteResultStarted(state) {
      state.loading = true;
      state.error = null;
    },
    deleteResultFulfilled(state, action: PayloadAction<IResultData>) {
      state.loading = false;
      state.results = state.results.filter((result) => result._id !== action.payload._id);
      state.error = null;
    },
    deleteResultRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        RESULTS_API.STARTED || 
        CREATE_RESULT_API.STARTED ||
        UPDATE_RESULT_API.STARTED ||
        DELETE_RESULT_API.STARTED, (state) => {
        state.loading = true;
        state.error = null;
      })
  },
});

export default resultSlice.reducer; 
export const {
  fetchResultsStarted,
  fetchResultsFulfilled,
  fetchResultsRejected,
  createResultStarted,
  createResultFulfilled,
  createResultRejected,
  updateResultStarted,
  updateResultFulfilled,
  updateResultRejected,
  deleteResultStarted,
  deleteResultFulfilled,
  deleteResultRejected,
} = resultSlice.actions;
