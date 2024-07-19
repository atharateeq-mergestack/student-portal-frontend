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
  import { IResultData } from 'utils/types';

  interface ResultState {
    results: IResultData[];
    loading: boolean;
    error: string | null;
    fetched: boolean;
  }
  
  const initialResultState: ResultState = {
    results: [],
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
        return { ...state, loading: false, results: action.payload, error: null, fetched: true};
      case CREATE_RESULT_SUCCESS:
        return { ...state, loading: false, results: [...state.results, action.payload], error: null };
      case UPDATE_RESULT_SUCCESS:
        return {
          ...state,
          loading: false,
          results: state.results.map(result => result._id === action.payload._id ? action.payload : result),
          error: null,
        };
      case DELETE_RESULT_SUCCESS:
        return {
          ...state,
          loading: false,
          results: state.results.filter(result => result._id !== action.payload),
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
