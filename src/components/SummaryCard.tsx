import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number | undefined;
  className: string;
}

const SummaryCard = ({ title, value, className } : SummaryCardProps) => {
  return (
    <div className={`summary-card ${className}`}>
      <div className="summary-title">{title}</div>
      <div className="summary-value">{value}</div>
    </div>
  );
};

export default SummaryCard;
