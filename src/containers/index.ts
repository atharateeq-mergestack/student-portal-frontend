import { connect } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux-saga';

import { RootState } from 'store';
import Modal from 'components/Modal';
import SummaryCards from 'components/SummaryCards';
import Table from 'components/Table';
import AddResult from 'pages/AddResult';
import Subject from 'pages/Subject';
import { IResultData, ICreateResult, ICreateSubject } from 'utils/types';
import { selectCardData } from 'containers/selectors/result';
import { selectSubjectDropDown } from 'containers/selectors/subject';
import { SUBJECTS_API, CREATE_SUBJECT_API, DELETE_RESULT_API, RESULTS_API, CREATE_RESULT_API, UPDATE_RESULT_API } from 'store/types';

// ====================  ModalContainer ====================
const mapStateToPropsModal = () => ({});

const mapDispatchToPropsModal = (dispatch: (action: PayloadAction<IResultData>) => void) => ({
  deleteResult: (data: IResultData) => dispatch({ type: DELETE_RESULT_API.STARTED, payload: data })
});

export const ModalContainer = connect(mapStateToPropsModal, mapDispatchToPropsModal)(Modal);

// ====================  SummaryCardsContainer ====================
const mapStateToPropsSummaryCards = (state: RootState) => {
  const { fetched } = state.results;
  return {
    fetched,
    cardData: selectCardData(state),
  };
};

const mapDispatchToPropsSummaryCards = (dispatch: (action: AnyAction) => void) => ({
  fetchResults: () => dispatch({ type: RESULTS_API.STARTED })
});

export const SummaryCardsContainer = connect(mapStateToPropsSummaryCards, mapDispatchToPropsSummaryCards)(SummaryCards);

// ====================  TableContainer ====================
const mapStateToPropsTable = (state: RootState) => ({
  results: state.results.results,
  fetched: state.results.fetched,
});

const mapDispatchToPropsTable = (dispatch: (action: AnyAction) => void) => ({
  fetchResults: () => dispatch({ type: RESULTS_API.STARTED })
});

export const TableContainer = connect(mapStateToPropsTable, mapDispatchToPropsTable)(Table);

// ====================  AddResultContainer ====================
const mapStateToPropsAddResult = (state: RootState) => ({
  loading: state.subjects.loading,
  subjects: selectSubjectDropDown(state),
  fetched: state.subjects.fetched,
});

const mapDispatchToPropsAddResult = (dispatch: (action: PayloadAction<ICreateResult> | AnyAction) => void) => ({
  createResult: (data: ICreateResult) => dispatch({ type: CREATE_RESULT_API.STARTED, payload: data }),
  updateResult: (data: ICreateResult) => dispatch({ type: UPDATE_RESULT_API.STARTED, payload: data }),
  fetchSubjects: () => dispatch({ type: SUBJECTS_API.STARTED })
});

export const AddResultContainer = connect(mapStateToPropsAddResult, mapDispatchToPropsAddResult)(AddResult);

// ====================  SubjectContainer ====================
const mapStateToPropsSubject = (state: RootState) => ({
  loading: state.subjects.loading,
  error: state.subjects.error,
});

const mapDispatchToPropsSubject = (dispatch: (action: PayloadAction<ICreateSubject>) => void) => ({
  createSubject: (data: ICreateSubject) => dispatch({ type: CREATE_SUBJECT_API.STARTED, payload: data })
});

export const SubjectContainer = connect(mapStateToPropsSubject, mapDispatchToPropsSubject)(Subject);
