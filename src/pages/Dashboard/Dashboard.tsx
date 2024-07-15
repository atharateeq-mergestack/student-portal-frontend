import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import ActionIcon from 'components/ActionIcon';
import { IApiResponse, IResultData } from 'utils/interface';
import { useNavigate } from 'react-router-dom';
import { getResult, deleteResult } from 'api/result';
import Modal from 'components/Modal/Modal';
import showToast from 'utils/toastMessage';

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<IResultData[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IResultData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const getGradeClassName = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A-':
        return 'a-plus-minus';
      case 'B+':
      case 'B-':
        return 'b-plus-minus';
      case 'F':
        return 'f';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IApiResponse = await getResult();
        if (response.success) setStudents(response.data);
      } catch (error: IApiResponse | any) {
        showToast(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleActionClick = (student: IResultData) => {
    setSelectedStudent(student);
    setDropdownVisible(!dropdownVisible);
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

  const confirmDelete = async () => {
    if (selectedStudent) {
      try {
        const response = await deleteResult(selectedStudent._id); 
        if (response.success) {
          const updatedStudents = students.filter(student => student._id !== selectedStudent._id);
          setStudents(updatedStudents);
        } 
        showToast(response)
      } catch (error: IApiResponse | any) {
        showToast(error);
      }
    }
    setShowModal(false); 
    setDropdownVisible(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleAddData = () => {
    navigate('/result/add');
  };

  const handleAddSubject = () => {
    navigate('/subject');
  };

  return (
    <div>
      <div className="dashboard-top-container">
        <h1 className="dashboard-top-header">Student Portal </h1>
      </div>
      <hr className='bar-line'/>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-text">
            <h1 >Student Summary </h1>
          </div>
          <div className="header-button">
            <button onClick={handleAddData}>+ Add data</button>
            <button onClick={handleAddSubject}>+ Add Subject</button>
          </div>
        </div>
        <div className="summary-section">
          <div className="summary-card summary-card-green">
            <div className="summary-title">Top Grade</div>
            <div className="summary-value">A+</div>
          </div>
          <div className="summary-card summary-card-green">
            <div className="summary-title">Most Passed</div>
            <div className="summary-value">English</div>
          </div>
          <div className="summary-card summary-card-red">
            <div className="summary-title">Lowest Grade</div>
            <div className="summary-value">F</div>
          </div>
          <div className="summary-card summary-card-red">
            <div className="summary-title">Most Failed</div>
            <div className="summary-value">Math</div>
          </div>
        </div>
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
                      <div ref={dropdownRef} className="dropdown-menu">
                        <div className="dropdown-item" onClick={handleEdit}>Edit</div>
                        <div className="dropdown-item" onClick={handleDelete}>Delete</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          message="Are you sure you want to delete this record?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;
