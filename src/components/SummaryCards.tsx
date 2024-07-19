import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { useEffect } from 'react';
import { fetchResultsRequest } from 'reduxStore/actions/resultActions';
import SummaryCard from 'components/SummaryCard';
import { generateCardData } from 'utils/cardData';

const SummaryCards = () => {
  const dispatch = useDispatch();

  const { stats, fetched } = useSelector((state : RootState) => state.results);

  useEffect(() => {  
    if(!fetched)  
      dispatch(fetchResultsRequest());
  }, [dispatch, fetched]);

  const cardData = generateCardData(stats);

  return (
    <div className="summary-section">
      {cardData.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          className={card.className}
        />
      ))}
    </div>
  );
};

export default SummaryCards;
