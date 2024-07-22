import { createSelector } from 'reselect';

import { RootState } from 'store';
import { SummaryCardProps } from 'utils/types';
import { generateCardData } from 'utils/cardData';
import { calculateStats } from 'utils/statsCalculator';

const selectResults = (state: RootState) => state.results.results;

export const selectCardData = createSelector(
  [selectResults],
  (result) : SummaryCardProps[] => generateCardData(calculateStats(result))
);
