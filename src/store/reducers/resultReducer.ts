import {
  RESULTS_API,
  CREATE_RESULT_API,
  UPDATE_RESULT_API,
  DELETE_RESULT_API
} from 'store/types';
import { ICreateResultFailure, ICreateResultSuccess, IDeleteResultFailure, IDeleteResultSuccess, IFetchResultsFailure, IFetchResultsSuccess, IUpdateResultFailure, IUpdateResultSuccess, ResultAction } from 'store/types/result';
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
  fetched: false,
};

function isFetchResultsSuccess(action: ResultAction): action is IFetchResultsSuccess {
  return action.type === RESULTS_API.FULLFILLED;
}

function isCreateResultSuccess(action: ResultAction): action is ICreateResultSuccess {
  return action.type === CREATE_RESULT_API.FULLFILLED;
}

function isUpdateResultSuccess(action: ResultAction): action is IUpdateResultSuccess {
  return action.type === UPDATE_RESULT_API.FULLFILLED;
}

function isDeleteResultSuccess(action: ResultAction): action is IDeleteResultSuccess {
  return action.type === DELETE_RESULT_API.FULLFILLED;
}

function isFailureAction(action: ResultAction): action is IFetchResultsFailure | ICreateResultFailure | IUpdateResultFailure | IDeleteResultFailure {
  return [RESULTS_API.REJECTED, CREATE_RESULT_API.REJECTED, UPDATE_RESULT_API.REJECTED, DELETE_RESULT_API.REJECTED].includes(action.type);
}

export const resultReducer = (state = initialResultState, action: ResultAction): ResultState => {
  switch (action.type) {
    case RESULTS_API.STARTED:
    case CREATE_RESULT_API.STARTED:
    case UPDATE_RESULT_API.STARTED:
    case DELETE_RESULT_API.STARTED:
      return { ...state, loading: true, error: null };
    
    case RESULTS_API.FULLFILLED:
      if (isFetchResultsSuccess(action)) {
        return {
          ...state,
          loading: false,
          results: action.payload,
          error: null,
          fetched: true,
        };
      }
      return state;
    
    case CREATE_RESULT_API.FULLFILLED:
      if (isCreateResultSuccess(action)) {
        return {
          ...state,
          loading: false,
          results: [...state.results, action.payload],
          error: null,
        };
      }
      return state;
    
    case UPDATE_RESULT_API.FULLFILLED:
      if (isUpdateResultSuccess(action)) {
        return {
          ...state,
          loading: false,
          results: state.results.map(result =>
            result._id === action.payload._id ? action.payload : result
          ),
          error: null,
        };
      }
      return state;
    
    case DELETE_RESULT_API.FULLFILLED:
      if (isDeleteResultSuccess(action)) {
        return {
          ...state,
          loading: false,
          results: state.results.filter(result => result._id !== action.payload),
          error: null,
        };
      }
      return state;
    
    case RESULTS_API.REJECTED:
    case CREATE_RESULT_API.REJECTED:
    case UPDATE_RESULT_API.REJECTED:
    case DELETE_RESULT_API.REJECTED:
      if (isFailureAction(action)) {
        return { ...state, loading: false, error: action.error };
      }
      return state;

    default:
      return state;
  }
}
