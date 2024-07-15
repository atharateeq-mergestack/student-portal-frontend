import { TableProps } from 'utils/types';
import { getGradeClassName } from 'utils/grades';
import ActionIcon from 'components/Icons/ActionIcon';
import ActionMenu from 'components/ActionMenu';

function Table ({ students, handleActionClick, dropdownVisible, selectedStudent, dropdownRef, handleEdit, handleDelete }: TableProps) {
  return (
    <div className="table-section">
      <div className="table-header">
        <div className="table-header-item">Name</div>
        <div className="table-header-item">Marks</div>
        <div className="table-header-item">Subject</div>
        <div className="table-header-item">Grade</div>
        <div className="table-header-item">Date</div>
        <div className="table-header-item">Action</div>
      </div>
      {students.map((student, index) => (
        <div key={index} className="table-row">
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
      ))}
    </div>
  );
};

export default Table;
