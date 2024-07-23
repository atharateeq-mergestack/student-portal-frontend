import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICreateSubject, ISubject } from 'utils/types';
import { createSubject, fetchSubjects } from 'api/subject';
import showToast from 'utils/toastMessage';

interface SubjectState {
  subjects: ISubject[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
  fetched: false,
};

export const fetchSubjectsAction = createAsyncThunk('subjects/fetchSubjects', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchSubjects();
    return response.data;
  } catch (error: any) {
    showToast(error);
    return rejectWithValue(error.message);
  }
});

export const createSubjectAction = createAsyncThunk('subjects/createSubject', async (subject: ICreateSubject, { rejectWithValue }) => {
  try {
    const response = await createSubject(subject);
    showToast(response);
    return response.data;
  } catch (error: any) {
    showToast(error);
    return rejectWithValue(error.message);
  }
});

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectsAction.fulfilled, (state, action: PayloadAction<ISubject[]>) => {
        state.loading = false;
        state.subjects = action.payload;
        state.error = null;
        state.fetched = true;
      })
      .addCase(fetchSubjectsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSubjectAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubjectAction.fulfilled, (state, action: PayloadAction<ISubject>) => {
        state.loading = false;
        state.subjects.push(action.payload);
        state.error = null;
      })
      .addCase(createSubjectAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subjectSlice.reducer;
