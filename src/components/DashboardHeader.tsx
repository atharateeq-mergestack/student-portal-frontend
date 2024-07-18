interface DashboardHeaderProps {
  handleAddData: () => void;
  handleAddSubject: () => void;
}

const DashboardHeader = ({ handleAddData, handleAddSubject }: DashboardHeaderProps) => (
  <div className="dashboard-header">
    <div className="header-text">
      <h1>Student Summary</h1>
    </div>
    <div className="header-button">
      <button onClick={handleAddData}>+ Add data</button>
      <button onClick={handleAddSubject}>+ Add Subject</button>
    </div>
  </div>
);

export default DashboardHeader;
