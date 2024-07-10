import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  userName: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const useSignup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user', data);
      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
