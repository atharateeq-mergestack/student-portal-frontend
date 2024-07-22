import { FieldError } from 'react-hook-form';
import { AiFillExclamationCircle } from 'react-icons/ai';
import Select, { StylesConfig } from 'react-select';

interface ISelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  onChange: (selectedOption: any) => void;
  classNamePrefix?: string;
  className?: string;
  placeholder?: string;
  styles?: StylesConfig;
  defaultValue?: { value: string; label: string } | null;
  error?: FieldError;
}

const customStyles: StylesConfig = {
  placeholder: (provided) => ({
    ...provided,
    color: '#757575',
    fontSize: '13px',
    padding: '10px'
  }),
  indicatorSeparator: () => ({}),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
    fontSize: '13px',
    padding: '10px'
  })
};

const SelectComponent = ({
  id,
  label,
  options,
  onChange,
  classNamePrefix = 'react-select',
  className,
  placeholder,
  styles = customStyles,
  defaultValue,
  error
}: ISelectProps) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <Select
      id={id}
      options={options}
      onChange={onChange}
      classNamePrefix={classNamePrefix}
      className={className}
      placeholder={placeholder}
      styles={styles}
      defaultValue={defaultValue}
    />
    {error && <AiFillExclamationCircle className="error-icon" />}
    {error && <p>{error.message}</p>}
  </div>
);

export default SelectComponent;
