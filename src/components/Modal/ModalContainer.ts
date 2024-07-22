import { connect } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import { RootState } from 'store';
import Modal from 'components/Modal';
import { IResultData } from 'utils/types';
import { deleteResultAction } from 'store/actions/resultActions';

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  deleteResult: (data: IResultData) => {dispatch(deleteResultAction(data))},
});

export default connect(null, mapDispatchToProps)(Modal);
