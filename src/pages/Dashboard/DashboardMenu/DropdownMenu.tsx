import './DropdownMenu.css';
import { IResultData } from 'utils/interface';

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  result: IResultData
}

function DropdownMenu ({ onEdit, onDelete, result } : DropdownMenuProps)  {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-item" onClick={onEdit}>Edit</div>
      <div className="dropdown-item" onClick={onDelete}>Delete</div>
    </div>
  );
};

export default DropdownMenu;
