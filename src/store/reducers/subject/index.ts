import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CREATE_SUBJECT_API, SUBJECTS_API } from 'store/types';

import { ISubject } from 'utils/types';

interface ISubjectState {
  subjects: ISubject[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: ISubjectState = {
  subjects: [],
  loading: false,
  error: null,
  fetched: false,
};

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    fetchSubjectsStarted(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSubjectsFulfilled(state, action: PayloadAction<ISubject[]>) {
      state.loading = false;
      state.subjects = action.payload;
      state.error = null;
      state.fetched = true;
    },
    fetchSubjectsRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createSubjectStarted(state) {      
      state.loading = true;
      state.error = null;
    },
    createSubjectFulfilled(state, action: PayloadAction<ISubject>) {
      state.loading = false;
      state.subjects.push(action.payload);
      state.error = null;
    },
    createSubjectRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SUBJECTS_API.STARTED || CREATE_SUBJECT_API.STARTED, (state) => {        
        state.loading = true;
        state.error = null;
      })
  },
});

export const {
  fetchSubjectsStarted,
  fetchSubjectsFulfilled,
  fetchSubjectsRejected,
  createSubjectStarted,
  createSubjectFulfilled,
  createSubjectRejected,
} = subjectSlice.actions;

export default subjectSlice.reducer;
