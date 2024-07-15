import { DashboardHeaderProps } from "utils/types";

function DashboardHeader ({ handleAddData, handleAddSubject } : DashboardHeaderProps) {
  return (
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
};

export default DashboardHeader;
