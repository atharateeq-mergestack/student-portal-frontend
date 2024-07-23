export const API_TYPE = <S extends string>(action: S) => ({
    STARTED: `${action}_STARTED`,
    FULLFILLED: `${action}_FULLFILLED`,
    REJECTED: `${action}_REJECTED`,
    RESET: `${action}_RESET`,
  });
  
  export const SUBJECTS_API = API_TYPE('SUBJECTS');
  export const CREATE_SUBJECT_API = API_TYPE('CREATE_SUBJECT');
  export const RESULTS_API = API_TYPE('RESULTS');
  export const CREATE_RESULT_API = API_TYPE('CREATE_RESULT');
  export const UPDATE_RESULT_API = API_TYPE('UPDATE_RESULT');
  export const DELETE_RESULT_API = API_TYPE('DELETE_RESULT');
