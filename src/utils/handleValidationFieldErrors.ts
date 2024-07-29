import { FieldValues, UseFormSetError, Path } from 'react-hook-form';

export const handleValidationErrors = <T extends FieldValues>(
  error: any, 
  setError: UseFormSetError<T>
) => {
  const validationErrors = error?.message || {};
  Object.keys(validationErrors).forEach((field) => {
    setError(field as Path<T>, { type: 'manual', message: validationErrors[field] });
  });
};
