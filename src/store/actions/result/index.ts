import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import { ICreateResult, IResultData } from 'utils/types';
import {
  RESULTS_API,
  CREATE_RESULT_API,
  UPDATE_RESULT_API,
  DELETE_RESULT_API,
} from 'store/types';
import { createResult, deleteResult, getResult, updateResult } from 'api/result';
import showToast from 'utils/toastMessage';
import { RootState } from 'store';

export const fetchResultsAction = () => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: RESULTS_API.STARTED });
  try {
    const response = await getResult();
    dispatch({ type: RESULTS_API.FULLFILLED, payload: response.data });
  } catch (error: any) {
    showToast(error);
    dispatch({ type: RESULTS_API.REJECTED, error: error.message });
  }
};

export const createResultAction = (result: ICreateResult) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: CREATE_RESULT_API.STARTED });
  try {
    const response = await createResult(result);
    dispatch({ type: CREATE_RESULT_API.FULLFILLED, payload: response.data });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: CREATE_RESULT_API.REJECTED, error: error.message });
  }
};

export const updateResultAction = (result: ICreateResult) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: UPDATE_RESULT_API.STARTED });
  try {
    const response = await updateResult(result);
    dispatch({ type: UPDATE_RESULT_API.FULLFILLED, payload: response.data });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: UPDATE_RESULT_API.REJECTED, error: error.message });
  }
};

export const deleteResultAction = (result: IResultData) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: DELETE_RESULT_API.STARTED });
  try {
    const response = await deleteResult(result);
    dispatch({ type: DELETE_RESULT_API.FULLFILLED, payload: result._id });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: DELETE_RESULT_API.REJECTED, error: error.message });
  }
};