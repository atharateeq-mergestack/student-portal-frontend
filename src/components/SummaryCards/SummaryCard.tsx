import { ISummaryCardProps } from "utils/types";

const SummaryCard = ({ title, value, className } : ISummaryCardProps) => {
  return (
    <div className={`summary-card ${className}`}>
      <div className="summary-title">{title}</div>
      <div className="summary-value">{value}</div>
    </div>
  );
};

export default SummaryCard;
