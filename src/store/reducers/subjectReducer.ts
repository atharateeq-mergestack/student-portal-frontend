import {
  FETCH_SUBJECTS_REQUEST,
  FETCH_SUBJECTS_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILURE,
  SubjectAction,
} from 'store/actions/actionTypes';
import { ISubject } from 'utils/types';

interface SubjectState {
  subjects: ISubject[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialSubjectState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
  fetched: false,
};

export const subjectReducer = (state = initialSubjectState, action: SubjectAction): SubjectState => {
  switch (action.type) {
    case FETCH_SUBJECTS_REQUEST:
    case CREATE_SUBJECT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        subjects: action.payload,
        error: null,
        fetched: true,
      };
    case CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        subjects: [...state.subjects, action.payload],
        error: null,
      };
    case FETCH_SUBJECTS_FAILURE:
    case CREATE_SUBJECT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
