import { useEffect } from 'react';

import SummaryCard from 'components/SummaryCards/SummaryCard';
import { SummaryCardProps } from 'utils/types';

interface ISummaryCardsProps {
  cardData: SummaryCardProps[];
  fetched: boolean;
  fetchResults: () => void;
}

const SummaryCards = ({cardData, fetched,  fetchResults}: ISummaryCardsProps) => {

  useEffect(() =>  {    
    if(!fetched)
      fetchResults()
  }, [fetched, fetchResults])

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
