import { FieldError, Control, Controller } from 'react-hook-form';
import { AiFillExclamationCircle } from 'react-icons/ai';
import Select, { StylesConfig, SingleValue } from 'react-select';

interface ISelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  classNamePrefix?: string;
  className?: string;
  placeholder?: string;
  styles?: StylesConfig;
  error?: FieldError;
  name: string;
  control: Control<any>;
}

const customStyles: StylesConfig = {
  placeholder: (provided) => ({
    ...provided,
    color: '#757575',
    fontSize: '13px',
    paddingLeft: '7px'
  }),
  indicatorSeparator: () => ({}),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
    fontSize: '13px',
    padding: '10px'
  }),
  input:(Provider) =>({
    ...Provider,
    margin: 0,
    paddingBottom: 0,
    paddingTop: 0,
  })
};

const SelectComponent = ({
  id,
  label,
  options,
  classNamePrefix = 'react-select',
  className,
  placeholder,
  styles = customStyles,
  control,
  name,
  error
}: ISelectProps) => (
  <div className={`form-group ${error ? 'input-error' : ''}`}>
    <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {          
          const { value, onChange } = field;
          const selectedOption = options.find(option => option.value === value);
          return (
            <Select
              {...field}
              value={selectedOption || null}
              options={options}
              classNamePrefix={classNamePrefix}
              className={className}
              placeholder={placeholder}
              styles={styles}
              onChange={(newValue) => {
                onChange((newValue as SingleValue<{ value: string; label: string }>)?.value || null);
              }}
            />

          );
        }}
    />
    {error && <AiFillExclamationCircle className="error-icon" />}
    {error && <p>{error.message}</p>}
  </div>
);

export default SelectComponent;
