import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IResultData } from 'utils/types';
import TableRow from 'components/Table/TableRow';
import TableHeader from 'components/Table/TableHeader';
import NoRecord from 'components/NoRecord';

interface TableProps {
  students: IResultData[];
  dropdownVisible: boolean;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudent: IResultData | null;
  setSelectedStudent: React.Dispatch<React.SetStateAction<IResultData | null>>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Table = ({ students, dropdownVisible, setDropdownVisible, selectedStudent, setSelectedStudent, dropdownRef, setShowModal }: TableProps) => {
  const navigate = useNavigate();

  const handleActionClick = (student: IResultData) => {
    setSelectedStudent(student);
    setDropdownVisible(!dropdownVisible);
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      if (dropdownRect.bottom > window.innerHeight) {
        dropdownRef.current.style.top = `-${dropdownRect.height}px`;
      } else {
        dropdownRef.current.style.top = `100%`;
      }
    }
  };

  const handleEdit = () => {
    if (selectedStudent) {
      navigate('/result/add', { state: { student: selectedStudent, isUpdate: true } });
    }
    setDropdownVisible(false);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <div className="table-section">
      <TableHeader />
      {students.length === 0 ? (
        <NoRecord />
      ):(
      students.map((student, index) => (
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
      ))
    )}
    </div>
  );
}

export default Table;
