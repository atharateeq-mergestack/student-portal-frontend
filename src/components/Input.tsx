import { AiFillExclamationCircle } from 'react-icons/ai';
import { InputProps } from 'utils/types';

function Input ({ id, label, type, placeholder, register, error, showPassword } : InputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="password-input">
        <input
          type={showPassword ? 'text' : type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={error ? 'input-error' : ''}
        />
      </div>
      {error && <AiFillExclamationCircle className="error-icon" />}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Input;
