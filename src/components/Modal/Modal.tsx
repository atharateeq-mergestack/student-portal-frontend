import { deleteResult } from 'api/result';
import { calculateStats } from 'utils/statsCalculator';
import { IApiResponse, IResultData, Istats } from 'utils/types';
import showToast from 'utils/toastMessage';
import 'components/Modal/style.css'; 

interface ModalProps{
  message: string;
  students: IResultData[];
  selectedStudent: IResultData | null;
  setStats: React.Dispatch<React.SetStateAction<Istats | undefined>>;
  setStudents: React.Dispatch<React.SetStateAction<IResultData[]>>;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ message, students, selectedStudent, setStats, setStudents, setDropdownVisible, setShowModal } : ModalProps) => {

  const confirmDelete = async () => {
    if (selectedStudent) {
      try {
        const response : IApiResponse = await deleteResult(selectedStudent); 
        if (response.success) {
          const updatedStudents = students.filter(student => student._id !== selectedStudent._id);
          setStudents(updatedStudents);
          const calculatedStats = calculateStats(updatedStudents);
          setStats(calculatedStats);
        } 
        showToast(response);
      } catch (error: IApiResponse | any) {
        showToast(error);
      }
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
