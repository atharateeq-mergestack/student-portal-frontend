import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import { ICreateResult, IResultData } from 'utils/types';
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
} from 'store/actions/actionTypes';
import { createResult, deleteResult, getResult, updateResult } from 'api/result';
import showToast from 'utils/toastMessage';
import { RootState } from 'store';

export const fetchResultsAction = () => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: FETCH_RESULTS_REQUEST });
  try {
    const response = await getResult();
    dispatch({ type: FETCH_RESULTS_SUCCESS, payload: response.data });
  } catch (error: any) {
    showToast(error);
    dispatch({ type: FETCH_RESULTS_FAILURE, error: error.message });
  }
};

export const createResultAction = (result: ICreateResult) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: CREATE_RESULT_REQUEST });
  try {
    const response = await createResult(result);
    dispatch({ type: CREATE_RESULT_SUCCESS, payload: response.data });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: CREATE_RESULT_FAILURE, error: error.message });
  }
};

export const updateResultAction = (result: ICreateResult) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: UPDATE_RESULT_REQUEST });
  try {
    const response = await updateResult(result);
    dispatch({ type: UPDATE_RESULT_SUCCESS, payload: response.data });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: UPDATE_RESULT_FAILURE, error: error.message });
  }
};

export const deleteResultAction = (result: IResultData) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: DELETE_RESULT_REQUEST });
  try {
    const response = await deleteResult(result);
    dispatch({ type: DELETE_RESULT_SUCCESS, payload: result._id });
    showToast(response);
  } catch (error: any) {
    showToast(error);
    dispatch({ type: DELETE_RESULT_FAILURE, error: error.message });
  }
};
