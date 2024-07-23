import { connect } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import { RootState } from 'store';
import Modal from 'components/Modal';
import SummaryCards from 'components/SummaryCards';
import Table from 'components/Table';
import AddResult from 'pages/AddResult';
import Subject from 'pages/Subject';
import { IResultData, ICreateResult, ICreateSubject } from 'utils/types';
import { selectCardData } from 'containers/selectors/result';
import { selectSubjectDropDown } from 'containers/selectors/subject';
import { createSubjectAction, fetchSubjectsAction } from 'store/reducers/subjectReducer';
import { createResultAction, deleteResultAction, fetchResultsAction, updateResultAction } from 'store/reducers/resultReducer';

// ====================  ModalContainer ====================
const mapStateToPropsModal = () => {};

const mapDispatchToPropsModal = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  deleteResult: async (data: IResultData) => dispatch( deleteResultAction(data))
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

const mapDispatchToPropsSummaryCards = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  fetchResults: async () => dispatch(fetchResultsAction())
});

export const SummaryCardsContainer = connect(mapStateToPropsSummaryCards, mapDispatchToPropsSummaryCards)(SummaryCards);

// ====================  TableContainer ====================
const mapStateToPropsTable = (state: RootState) => ({
  results: state.results.results,
  fetched: state.results.fetched,
});

const mapDispatchToPropsTable = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  fetchResults: async () => dispatch(fetchResultsAction())
});

export const TableContainer = connect(mapStateToPropsTable, mapDispatchToPropsTable)(Table);

// ====================  AddResultContainer ====================
const mapStateToPropsAddResult = (state: RootState) => ({
  loading: state.subjects.loading,
  subjects: selectSubjectDropDown(state),
  fetched: state.subjects.fetched,
});

const mapDispatchToPropsAddResult = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  createResult: async (data: ICreateResult) => dispatch(createResultAction(data)),
  updateResult: async (data: ICreateResult) => dispatch(updateResultAction(data)),
  fetchSubjects: async () => dispatch(fetchSubjectsAction())
});

export const AddResultContainer = connect(mapStateToPropsAddResult, mapDispatchToPropsAddResult)(AddResult);

// ====================  SubjectContainer ====================
const mapStateToPropsSubject = (state: RootState) => ({
  loading: state.subjects.loading,
  error: state.subjects.error,
});

const mapDispatchToPropsSubject = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  createSubject: async (data: ICreateSubject) => dispatch(createSubjectAction(data))
});

export const SubjectContainer = connect(mapStateToPropsSubject, mapDispatchToPropsSubject)(Subject);
