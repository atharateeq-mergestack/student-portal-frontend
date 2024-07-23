import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICreateResult, IResultData } from 'utils/types';
import { createResult, deleteResult, getResult, updateResult } from 'api/result';
import showToast from 'utils/toastMessage';

interface ResultState {
  results: IResultData[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: ResultState = {
  results: [],
  loading: false,
  error: null,
  fetched: false,
};

export const fetchResultsAction = createAsyncThunk('results/fetchResults', async (_, { rejectWithValue }) => {
  try {
    const response = await getResult();
    return response.data;
  } catch (error: any) {
    showToast(error);
    return rejectWithValue(error.message);
  }
});

export const createResultAction = createAsyncThunk('results/createResult', async (result: ICreateResult, { rejectWithValue }) => {
  try {
    const response = await createResult(result);
    showToast(response);
    return response.data;
  } catch (error: any) {
    showToast(error);
    return rejectWithValue(error.message);
  }
});

export const updateResultAction = createAsyncThunk('results/updateResult', async (result: ICreateResult, { rejectWithValue }) => {
  try {
    const response = await updateResult(result);
    showToast(response);
    return response.data;
  } catch (error: any) {
    showToast(error);
    return rejectWithValue(error.message);
  }
});

export const deleteResultAction = createAsyncThunk('results/deleteResult', async (result: IResultData, { rejectWithValue }) => {
  try {
    const response = await deleteResult(result);
    showToast(response);
    return result;
  } catch (error: any) {
    showToast(error);
    return rejectWithValue(error.message);
  }
});

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultsAction.fulfilled, (state, action: PayloadAction<IResultData[]>) => {
        state.loading = false;
        state.results = action.payload;
        state.error = null;
        state.fetched = true;
      })
      .addCase(fetchResultsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createResultAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResultAction.fulfilled, (state, action: PayloadAction<IResultData>) => {
        state.loading = false;
        state.results.push(action.payload);
        state.error = null;
      })
      .addCase(createResultAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateResultAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResultAction.fulfilled, (state, action: PayloadAction<IResultData>) => {
        state.loading = false;
        state.results = state.results.map((result) =>
          result._id === action.payload._id ? action.payload : result
        );
        state.error = null;
      })
      .addCase(updateResultAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteResultAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResultAction.fulfilled, (state, action: PayloadAction<IResultData>) => {
        state.loading = false;
        state.results = state.results.filter((result) => result._id !== action.payload._id);
        state.error = null;
      })
      .addCase(deleteResultAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default resultSlice.reducer; 
export const { actions: resultActions } = resultSlice; 
