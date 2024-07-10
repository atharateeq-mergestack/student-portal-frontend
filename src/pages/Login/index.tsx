import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export const useLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      console.log(response.data.data);
      
      if (response.data.success) {
        const token = response.data.data;
        const expirationTime = 3600 * 1000;
        Cookies.set('token', token, { expires: new Date(Date.now() + expirationTime) });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  };
};
