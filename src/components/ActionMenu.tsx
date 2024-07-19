import EditIcon from 'components/Icons/EditIcon';
import DeleteIcon from 'components/Icons/DeleteIcon';

interface ActionMenuProps {
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleEdit: () => void;
  handleDelete: () => void;
}

const ActionMenu = ({ dropdownRef, handleEdit, handleDelete }: ActionMenuProps) => (
  <div ref={dropdownRef} className="dropdown-menu">
    <div className="dropdown-item" onClick={handleEdit}>
      <EditIcon width="20" height="20" />
      <span>Edit</span>
    </div>
    <div className="dropdown-item" onClick={handleDelete}>
      <DeleteIcon width="20" height="20" />
      <span>Delete</span>
    </div>
  </div>
);

export default ActionMenu;
