import { useNavigate } from 'react-router-dom';

import EditIcon from 'components/Icons/EditIcon';
import DeleteIcon from 'components/Icons/DeleteIcon';
import ModalContainer from 'components/Modal/ModalContainer';
import { IResultData } from 'utils/types';

interface IActionMenuProps {
  dropdownRef: React.RefObject<HTMLDivElement>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudent: IResultData | null;
  showModal: boolean;
}

const ActionMenu = ({ dropdownRef, setShowModal, setDropdownVisible, selectedStudent, showModal }: IActionMenuProps) => {
  const navigate = useNavigate() 

  const handleEdit = () => {
    if (selectedStudent) {
      navigate('/result/add', { state: { student: selectedStudent, isUpdate: true } });
    }
    setDropdownVisible(false);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  return  (
  <div ref={dropdownRef} className="dropdown-menu">

    <div className="dropdown-item" onClick={handleEdit}>
      <EditIcon width="20" height="20" />
      <span>Edit</span>
    </div>

    <div className="dropdown-item" onClick={handleDelete}>
      <DeleteIcon width="20" height="20" />
      <span>Delete</span>
    </div>

    {showModal && (
        <ModalContainer
          message="Are you sure you want to delete this record?"
          selectedStudent={selectedStudent}
          setDropdownVisible={setDropdownVisible}
          setShowModal={setShowModal}
        />
      )}

  </div>
)};

export default ActionMenu;
