import { IResultData, Istats, Result } from 'utils/types';
import { CONSTANTS } from 'utils/constant';

export function calculateStats(resultData: IResultData[]): Istats | undefined {
  if (resultData.length === 0) return undefined;
  
  const subjectPassCount: Result = {};
  const subjectFailCount: Result = {};
  
  let highestGrade = 'F';
  let lowestGrade = 'A+';
  
  resultData.forEach(data => {
    const { subjectName } = data.subjectId;
    const { grade } = data;
  
    if (!subjectPassCount[subjectName]) subjectPassCount[subjectName] = 0;
    if (!subjectFailCount[subjectName]) subjectFailCount[subjectName] = 0;
  
    if (grade === 'F') {
      subjectFailCount[subjectName]++;
    } else {
      subjectPassCount[subjectName]++;
    }
  
    highestGrade = CONSTANTS.GRADES.indexOf(grade) < CONSTANTS.GRADES.indexOf(highestGrade) ? grade : highestGrade;
    lowestGrade = CONSTANTS.GRADES.indexOf(grade) > CONSTANTS.GRADES.indexOf(lowestGrade) ? grade : lowestGrade;
  });
  
  const highestPassCountSubject = Object.keys(subjectPassCount).reduce((a, b) => subjectPassCount[a] > subjectPassCount[b] ? a : b, '');
  const highestFailCountSubject = Object.keys(subjectFailCount).reduce((a, b) => subjectFailCount[a] > subjectFailCount[b] ? a : b, '');

  return {
    highestGrade: highestGrade,
    lowestGrade,
    mostPassedSubject: highestPassCountSubject,
    mostFailedSubject: subjectFailCount[highestFailCountSubject] === 0 ? "--" : highestFailCountSubject,
  };
}
