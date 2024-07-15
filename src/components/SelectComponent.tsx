import { AiFillExclamationCircle } from 'react-icons/ai';
import Select from 'react-select';

import { SelectProps } from 'utils/types';

const customStyles = {
  placeholder: (provided: any) => ({
    ...provided,
    color: '#757575',
    fontSize: '13px',
    padding: '10px'
  }),
  indicatorSeparator: () => ({}),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#333',
    fontSize: '13px',
    padding: '10px'
  })
};

function SelectComponent ({id, label, options, onChange, classNamePrefix = 'react-select',  className, placeholder, styles = customStyles, defaultValue, error } :SelectProps) {
  return (

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
};

export default SelectComponent;
