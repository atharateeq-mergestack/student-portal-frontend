import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { IApiResponse, IResultData, Istats, Result } from 'utils/types';
import { getResult, deleteResult } from 'api/result';
import { CONSTANTS } from 'utils/constant';
import Modal from 'components/Modal/Modal';
import showToast from 'utils/toastMessage';
import DashboardHeader from 'components/DashboardHeader';
import SummaryCards from 'components/SummaryCards';
import Table from 'components/Table';
import 'pages/Dashboard/style.css';

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<IResultData[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IResultData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState<Istats | undefined>(undefined);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IApiResponse = await getResult();
        if (response.success) {
          setStudents(response.data);
          calculateStats(response.data);
        }
      } catch (error: IApiResponse | any) {
        showToast(error);
      }
    };

    fetchData();
  }, []);

  const calculateStats = (resultData: IResultData[]) => {
    if (resultData.length === 0) return;  
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
    setStats({
      highestGrade: highestGrade,
      lowestGrade,
      mostPassedSubject:  highestPassCountSubject,
      mostFailedSubject: subjectFailCount[highestFailCountSubject] === 0 ? "--": highestFailCountSubject,
    });
  };

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

  const confirmDelete = async () => {
    if (selectedStudent) {
      try {
        const response = await deleteResult(selectedStudent._id); 
        if (response.success) {
          const updatedStudents = students.filter(student => student._id !== selectedStudent._id);
          setStudents(updatedStudents);
          calculateStats(updatedStudents);
        } 
        showToast(response);
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
        <h1 className="dashboard-top-header">Student Portal</h1>
      </div>
      <hr className='bar-line'/>
      <div className="dashboard-container">
        <DashboardHeader handleAddData={handleAddData} handleAddSubject={handleAddSubject} />
        <SummaryCards stats={stats} />
        <Table
          students={students}
          handleActionClick={handleActionClick}
          dropdownVisible={dropdownVisible}
          selectedStudent={selectedStudent}
          dropdownRef={dropdownRef}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
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
