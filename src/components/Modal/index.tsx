import { IResultData } from 'utils/types';
import 'components/Modal/style.css'; 

interface ModalProps{
  message: string;
  selectedStudent: IResultData | null;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteResult: (data: IResultData)  => void
}

const Modal = ({ message, selectedStudent, setDropdownVisible, setShowModal, deleteResult } : ModalProps) => {
  const confirmDelete = () => {
    if (selectedStudent) {
      deleteResult(selectedStudent)
    }
    setShowModal(false);
    setDropdownVisible(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={confirmDelete}>Delete</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
