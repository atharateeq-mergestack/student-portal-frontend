import { useDispatch } from 'react-redux';

import { IResultData, Istats } from 'utils/types';
import { deleteResultRequest } from 'reduxStore/actions/resultActions';
import 'components/Modal/style.css'; 

interface ModalProps{
  message: string;
  selectedStudent: IResultData | null;
  setStats: React.Dispatch<React.SetStateAction<Istats | undefined>>;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ message, selectedStudent, setDropdownVisible, setShowModal } : ModalProps) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    if (selectedStudent) {
      dispatch(deleteResultRequest(selectedStudent));
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
