import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .matches(/^[a-zA-Z]+$/, 'First Name must contain only letters'),
  lastName: yup
    .string()
    .required('Last Name is required')
    .matches(/^[a-zA-Z]+$/, 'Last Name must contain only letters'),
  userName: yup
    .string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and contain both letters and numbers'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});


export const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and contain both letters and numbers'),
  });