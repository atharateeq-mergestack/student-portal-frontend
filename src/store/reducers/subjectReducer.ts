import {
  SUBJECTS_API,
  CREATE_SUBJECT_API,
} from 'store/types';
import {  ICreateSubjectFailure, ICreateSubjectSuccess, IFetchSubjectsFailure, IFetchSubjectsSuccess, SubjectAction } from 'store/types/subject';
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

function isFetchSubjectsSuccess(action: SubjectAction): action is IFetchSubjectsSuccess {
  return action.type === SUBJECTS_API.FULLFILLED;
}

function isCreateSubjectSuccess(action: SubjectAction): action is ICreateSubjectSuccess {
  return action.type === CREATE_SUBJECT_API.FULLFILLED;
}

function isFailureAction(action: SubjectAction): action is IFetchSubjectsFailure | ICreateSubjectFailure {
  return [SUBJECTS_API.REJECTED, CREATE_SUBJECT_API.REJECTED].includes(action.type);
}

export const subjectReducer = (state = initialSubjectState, action: SubjectAction): SubjectState => {
  switch (action.type) {
    case SUBJECTS_API.STARTED:
    case CREATE_SUBJECT_API.STARTED:
      return { ...state, loading: true, error: null };
    
    case SUBJECTS_API.FULLFILLED:
      if (isFetchSubjectsSuccess(action)) {
        return {
          ...state,
          loading: false,
          subjects: action.payload,
          error: null,
          fetched: true,
        };
      }
      return state;
    
    case CREATE_SUBJECT_API.FULLFILLED:
      if (isCreateSubjectSuccess(action)) {
        return {
          ...state,
          loading: false,
          subjects: [...state.subjects, action.payload],
          error: null,
        };
      }
      return state;
    
    case SUBJECTS_API.REJECTED:
    case CREATE_SUBJECT_API.REJECTED:
      if (isFailureAction(action)) {
        return { ...state, loading: false, error: action.error };
      }
      return state;

    default:
      return state;
  }
}
