import { useRef, useState } from 'react';

import ActionIcon from 'components/Icons/ActionIcon';
import ActionMenu from 'components/ActionMenu';
import { getGradeClassName } from 'utils/grades';
import { IResultData } from 'utils/types';
import DateTimeDisplay from 'components/DateTimeDisplay';

type ITableRowProps = {
  student: IResultData;
};

const TableRow = ({ student,} : ITableRowProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IResultData | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const handleActionClick = (student: IResultData) => {
    setSelectedStudent(student);
    setDropdownVisible((prevState) => !prevState);
    document.addEventListener("mousedown", handleClickOutside);
    };

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

      <div className="table-cell">
        <DateTimeDisplay date={student.createdAt}/>
      </div>

      <div className="table-cell">
        <div className="action-button">
          <div>
            <ActionIcon width="20" height="20" onClick={() => handleActionClick(student)} />
            {dropdownVisible && selectedStudent === student && (
              <ActionMenu
                dropdownRef={dropdownRef}
                setShowModal={setShowModal}
                setDropdownVisible={setDropdownVisible}
                selectedStudent={selectedStudent}
                showModal={showModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableRow;
