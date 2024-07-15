import { SummaryCardsProps } from 'utils/types';

function SummaryCards ({ stats }:SummaryCardsProps)  {
  return (
    <div className="summary-section">
      <div className="summary-card summary-card-green">
        <div className="summary-title">Top Grade</div>
        <div className="summary-value">{stats?.highestGrade}</div>
      </div>
      <div className="summary-card summary-card-green">
        <div className="summary-title">Most Passed</div>
        <div className="summary-value">{stats?.mostPassedSubject}</div>
      </div>
      <div className="summary-card summary-card-red">
        <div className="summary-title">Lowest Grade</div>
        <div className="summary-value">{stats?.lowestGrade}</div>
      </div>
      <div className="summary-card summary-card-red">
        <div className="summary-title">Most Failed</div>
        <div className="summary-value">{stats?.mostFailedSubject}</div>
      </div>
    </div>
  );
};

export default SummaryCards;
