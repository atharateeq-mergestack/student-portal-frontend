import { FieldError, UseFormRegister } from 'react-hook-form';
import { AiFillExclamationCircle } from 'react-icons/ai';

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  showPassword?: boolean;
}

const Input = ({
  id,
  label,
  type,
  placeholder,
  register,
  error,
  showPassword
}: InputProps) => (
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

export default Input;
