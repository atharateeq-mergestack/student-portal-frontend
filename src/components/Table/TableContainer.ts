import { connect } from 'react-redux';

import { RootState } from 'store';
import Table from 'components/Table';
import { fetchResultsAction } from 'store/actions/resultActions';

const mapStateToProps = (state: RootState) => {
  return {
    results: state.results.results,
    fetched: state.results.fetched,
  }
};

const mapDispatchToProps = {
  fetchResults: fetchResultsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
