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


  export const subjectSchema = yup.object().shape({
    subjectName: yup
      .string()
      .required('Subject name is required')
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}:;<>,.?~\\-\s]*$/, 'Subject name has invalid entry.'),
      subjectDescription: yup
      .string()
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}:;<>,.?~\\-\s]*$/, 'Subject description has invalid entry.'),
  });

  export const resultSchema = yup.object().shape({
    studentName: yup
      .string()
      .required('Student name is required')
      .matches(/^[a-zA-Z\s]*$/, 'Student name has invalid entry.'),
    subjectId: yup
      .string()
      .required('Subject is required'),
    marks: yup
      .number()
      .required('Marks are required')
      .min(0, 'Marks must be at least 0')
      .max(100, 'Marks must be at most 100'),
    grade: yup
      .string()
      .required('Grade is required')
      .matches(/^[A-F][+-]?$/, 'Grade has invalid entry.'),
  });