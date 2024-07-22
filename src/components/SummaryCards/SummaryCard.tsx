import { SummaryCardProps } from "utils/types";

const SummaryCard = ({ title, value, className } : SummaryCardProps) => {
  return (
    <div className={`summary-card ${className}`}>
      <div className="summary-title">{title}</div>
      <div className="summary-value">{value}</div>
    </div>
  );
};

export default SummaryCard;
