import SummaryCard from 'components/SummaryCard';
import { Istats } from 'utils/types';

interface SummaryCardsProps {
  stats: Istats | undefined;
}

const SummaryCards = ({ stats } : SummaryCardsProps) => {
  const cardData = [
    { title: 'Top Grade', value: stats?.highestGrade|| '--', className: 'summary-card-green' },
    { title: 'Most Passed', value: stats?.mostPassedSubject|| '--', className: 'summary-card-green' },
    { title: 'Lowest Grade', value: stats?.lowestGrade|| '--', className: 'summary-card-red' },
    { title: 'Most Failed', value: stats?.mostFailedSubject|| '--', className: 'summary-card-red' }
  ];

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
