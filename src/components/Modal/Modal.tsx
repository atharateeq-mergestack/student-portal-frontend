import { ModalProps } from 'utils/types';
import 'components/Modal/style.css'; 

function Modal ({ message, onConfirm, onCancel } : ModalProps) {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
