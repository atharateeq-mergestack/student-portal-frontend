import { Istats } from "utils/types";

interface CardData {
    title: string;
    value: string;
    className: string;
}

export const generateCardData = (stats: Istats | undefined): CardData[] => {
    return [
        { title: 'Top Grade', value: stats?.highestGrade || '--', className: 'summary-card-green' },
        { title: 'Most Passed', value: stats?.mostPassedSubject || '--', className: 'summary-card-green' },
        { title: 'Lowest Grade', value: stats?.lowestGrade || '--', className: 'summary-card-red' },
        { title: 'Most Failed', value: stats?.mostFailedSubject || '--', className: 'summary-card-red' }
    ];
};
