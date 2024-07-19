import React from 'react';

import ActionIcon from 'components/Icons/ActionIcon';
import ActionMenu from 'components/ActionMenu';
import { getGradeClassName } from 'utils/grades';
import { IResultData } from 'utils/types';

type TableRowProps = {
  student: IResultData;
  handleActionClick: (student: IResultData) => void;
  dropdownVisible: boolean;
  selectedStudent: IResultData | null;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleEdit: () => void;
  handleDelete: () => void;
};

const TableRow = ({
  student,
  handleActionClick,
  dropdownVisible,
  selectedStudent,
  dropdownRef,
  handleEdit,
  handleDelete
} : TableRowProps) => {
  return (
    <div className="table-row">
      <div className="table-cell">{student.studentName}</div>
      <div className="table-cell">{student.marks}</div>
      <div className="table-cell">{student.subjectId.subjectName}</div>
      <div className="table-cell">
        <div className={`grade ${getGradeClassName(student.grade)}`}>
          {student.grade}
        </div>
      </div>
      <div className="table-cell">{student.createdAt}</div>
      <div className="table-cell">
        <div className="action-button">
          <div>
            <ActionIcon width="20" height="20" onClick={() => handleActionClick(student)} />
            {dropdownVisible && selectedStudent === student && (
              <ActionMenu
                dropdownRef={dropdownRef}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableRow;
