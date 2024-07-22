import {createSelector }  from 'reselect'

import { RootState } from 'store';
import { ISubjectsDropDown } from 'utils/types';

const selectSubject = (state: RootState) => state.subjects.subjects;

export const selectSubjectDropDown = createSelector(
    [selectSubject],
    (subjects) : ISubjectsDropDown[] => subjects.map(subject => ({
        value: subject._id,
        label: subject.subjectName
        })
    )
);
