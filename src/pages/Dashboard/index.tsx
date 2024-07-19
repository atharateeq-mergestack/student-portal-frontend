import { useState, useEffect, useRef } from 'react';

import { IApiResponse, IResultData, Istats, } from 'utils/types';
import { getResult } from 'api/result';
import Modal from 'components/Modal/Modal';
import showToast from 'utils/toastMessage';
import DashboardHeader from 'components/DashboardHeader';
import SummaryCards from 'components/SummaryCards';
import Table from 'components/Table/Table';
import 'pages/Dashboard/style.css';
import { calculateStats } from 'utils/statsCalculator';

function Dashboard() {
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
          const calculatedStats = calculateStats(response.data);
          setStats(calculatedStats);
        }
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


  return (
    <div>
      <div className="dashboard-top-container">
        <h1 className="dashboard-top-header">Student Portal</h1>
      </div>
      <hr className='bar-line'/>
      <div className="dashboard-container">
        <DashboardHeader />
        <SummaryCards stats={stats} />
        <Table
          students={students}
          dropdownVisible={dropdownVisible}
          setDropdownVisible={setDropdownVisible}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          dropdownRef={dropdownRef}
          setShowModal={setShowModal}
        />
      </div>
      {showModal && (
        <Modal
          message="Are you sure you want to delete this record?"
          students={students}
          setStats={setStats}
          selectedStudent={selectedStudent}
          setStudents={setStudents}
          setDropdownVisible={setDropdownVisible}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
