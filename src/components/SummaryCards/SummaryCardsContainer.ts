import { connect } from 'react-redux';

import { RootState } from 'store';
import SummaryCards from 'components/SummaryCards';
import { selectCardData } from 'selectors/ResultSelector';
import { fetchResultsAction } from 'store/actions/resultActions';

const mapStateToProps = (state: RootState) => {
  const { fetched } = state.results
  return{
    fetched,
    cardData: selectCardData(state)
  }
};

const mapDispatchToProps = {
  fetchResults: fetchResultsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryCards);
