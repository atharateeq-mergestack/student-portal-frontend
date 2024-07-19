import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IResultData, Istats, } from 'utils/types';
import { RootState } from 'store';
import { calculateStats } from 'utils/statsCalculator';
import { fetchResultsRequest } from 'reduxStore/actions/resultActions';
import Modal from 'components/Modal/Modal';
import DashboardHeader from 'components/DashboardHeader';
import SummaryCards from 'components/SummaryCards';
import Table from 'components/Table/Table';
import 'pages/Dashboard/style.css';

function Dashboard() {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IResultData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState<Istats | undefined>(undefined);
  const { results, fetched} = useSelector((state : RootState) => state.results);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {  
    if(!fetched)  
      dispatch(fetchResultsRequest());
  }, [dispatch, fetched]);

  useEffect(() => {
    if (results.length) {
      setStats(calculateStats(results));
    }
  }, [results]);

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
          students={results}
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
          students={results}
          setStats={setStats}
          selectedStudent={selectedStudent}
          setDropdownVisible={setDropdownVisible}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
