import React from 'react';
import { IResultData } from 'utils/types';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

interface TableProps {
  students: IResultData[];
  handleActionClick: (student: IResultData) => void;
  dropdownVisible: boolean;
  selectedStudent: IResultData | null;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleEdit: () => void;
  handleDelete: () => void;
}
function Table ({ students, handleActionClick, dropdownVisible, selectedStudent, dropdownRef, handleEdit, handleDelete }: TableProps) {
  return (
    <div className="table-section">
      <TableHeader />
      {students.map((student, index) => (
        <TableRow
          key={index}
          student={student}
          handleActionClick={handleActionClick}
          dropdownVisible={dropdownVisible}
          selectedStudent={selectedStudent}
          dropdownRef={dropdownRef}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Table;
