import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { RootState } from 'store';
import Subject from 'pages/Subject';
import { ICreateSubject } from 'utils/types';
import { createSubjectAction } from 'store/actions/subject';

const mapStateToProps = (state: RootState) => ({
  loading: state.subjects.loading,
  error: state.subjects.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  createSubject: (data: ICreateSubject) => {dispatch(createSubjectAction(data))},
});

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
