import DashboardHeader from 'components/DashboardHeader';
import SummaryCardsContainer from 'components/SummaryCards/SummaryCardsContainer';
import TableContainer from 'components/Table/TableContainer';
import 'pages/Dashboard/style.css';

function Dashboard() {

  return (
    <div>
      <div className="dashboard-top-container">
        <h1 className="dashboard-top-header">Student Portal</h1>
      </div>
      <hr className='bar-line'/>
      <div className="dashboard-container">
        <DashboardHeader />
        <SummaryCardsContainer />
        <TableContainer />
      </div>
    </div>
  );
}

export default Dashboard;
