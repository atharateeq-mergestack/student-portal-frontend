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
import { deleteResultAction, fetchResultsAction, createResultAction, updateResultAction } from 'store/actions/result';
import { fetchSubjectsAction, createSubjectAction } from 'store/actions/subject';
import { selectCardData } from './selectors/result';
import { selectSubjectDropDown } from './selectors/subject';

// ====================  ModalContainer ==================== 
const mapStateToPropsModal = () => {};
  
const mapDispatchToPropsModal = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  deleteResult: (data: IResultData) => {dispatch(deleteResultAction(data))},
});

const ModalContainer = connect(mapStateToPropsModal, mapDispatchToPropsModal)(Modal);

// ====================  SummaryCardsContainer ==================== 
const mapStateToPropsSummaryCards = (state: RootState) => {
  const { fetched } = state.results;
  return {
    fetched,
    cardData: selectCardData(state),
  };
};

const mapDispatchToPropsSummaryCards = {
  fetchResults: fetchResultsAction,
};

const SummaryCardsContainer = connect(mapStateToPropsSummaryCards, mapDispatchToPropsSummaryCards)(SummaryCards);

// ====================  TableContainer ==================== 
const mapStateToPropsTable = (state: RootState) => ({
  results: state.results.results,
  fetched: state.results.fetched,
});

const mapDispatchToPropsTable = {
  fetchResults: fetchResultsAction,
};

const TableContainer = connect(mapStateToPropsTable, mapDispatchToPropsTable)(Table);

// ====================  AddResultContaine ==================== 
const mapStateToPropsAddResult = (state: RootState) => ({
  loading: state.subjects.loading,
  subjects: selectSubjectDropDown(state),
  fetched: state.subjects.fetched,
});

const mapDispatchToPropsAddResult = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  createResult: (data: ICreateResult) => dispatch(createResultAction(data)),
  updateResult: (data: ICreateResult) => dispatch(updateResultAction(data)),
  fetchSubjects: () => dispatch(fetchSubjectsAction()),
});

const AddResultContainer = connect(mapStateToPropsAddResult, mapDispatchToPropsAddResult)(AddResult);

// ====================  SubjectContainer ==================== 
const mapStateToPropsSubject = (state: RootState) => ({
  loading: state.subjects.loading,
  error: state.subjects.error
});
;

const mapDispatchToPropsSubject = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  createSubject: (data: ICreateSubject) => {dispatch(createSubjectAction(data))},
});

const SubjectContainer = connect(mapStateToPropsSubject, mapDispatchToPropsSubject)(Subject);

export {
  ModalContainer,
  SummaryCardsContainer,
  TableContainer,
  AddResultContainer,
  SubjectContainer,
};
