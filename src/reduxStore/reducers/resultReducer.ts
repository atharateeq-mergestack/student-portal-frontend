import {
  FETCH_RESULTS_REQUEST,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
  CREATE_RESULT_REQUEST,
  CREATE_RESULT_SUCCESS,
  CREATE_RESULT_FAILURE,
  UPDATE_RESULT_REQUEST,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILURE,
  DELETE_RESULT_REQUEST,
  DELETE_RESULT_SUCCESS,
  DELETE_RESULT_FAILURE,
  ResultAction,
} from 'reduxStore/actions/actionTypes';
import { IResultData, Istats } from 'utils/types';
import { calculateStats } from 'utils/statsCalculator';

interface ResultState {
  results: IResultData[];
  stats: Istats | undefined;
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialResultState: ResultState = {
  results: [],
  stats: undefined,
  loading: false,
  error: null,
  fetched: false
};

export const resultReducer = (state = initialResultState, action: ResultAction): ResultState => {
  switch (action.type) {
    case FETCH_RESULTS_REQUEST:
    case CREATE_RESULT_REQUEST:
    case UPDATE_RESULT_REQUEST:
    case DELETE_RESULT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        stats: calculateStats(action.payload),
        error: null,
        fetched: true,
      };
    case CREATE_RESULT_SUCCESS:
      const newResultsAfterCreate = [...state.results, action.payload];
      return {
        ...state,
        loading: false,
        results: newResultsAfterCreate,
        stats: calculateStats(newResultsAfterCreate),
        error: null,
      };
    case UPDATE_RESULT_SUCCESS:
      const newResultsAfterUpdate = state.results.map(result =>
        result._id === action.payload._id ? action.payload : result
      );
      return {
        ...state,
        loading: false,
        results: newResultsAfterUpdate,
        stats: calculateStats(newResultsAfterUpdate),
        error: null,
      };
    case DELETE_RESULT_SUCCESS:
      const newResultsAfterDelete = state.results.filter(result => result._id !== action.payload);
      return {
        ...state,
        loading: false,
        results: newResultsAfterDelete,
        stats: calculateStats(newResultsAfterDelete),
        error: null,
      };
    case FETCH_RESULTS_FAILURE:
    case CREATE_RESULT_FAILURE:
    case UPDATE_RESULT_FAILURE:
    case DELETE_RESULT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
