import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { RootState } from 'store';
import AddResult from 'pages/AddResult';
import { ICreateResult } from 'utils/types';
import { selectSubjectDropDown } from 'selectors/SubjectSelector';
import { fetchSubjectsAction } from 'store/actions/subject';
import { createResultAction, updateResultAction } from 'store/actions/result';

const mapStateToProps = (state: RootState) => ({
  loading: state.subjects.loading,
  subjects: selectSubjectDropDown(state),
  fetched: state.subjects.fetched
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  createResult: (data: ICreateResult) => dispatch(createResultAction(data)),
  updateResult: (data: ICreateResult) => dispatch(updateResultAction(data)),
  fetchSubjects: () => dispatch(fetchSubjectsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddResult);
