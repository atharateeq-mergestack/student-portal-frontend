import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import { loginSchema } from 'utils/validationSchema';
import { IApiResponse, ILogin } from 'utils/types';
import { loginUser } from 'api/user';
import showToast from 'utils/toastMessage';
import Input from 'components/Input';
import 'pages/Login/style.css';
import { handleValidationErrors } from 'utils/handleValidationFieldErrors';

const Login = ()  => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const response: IApiResponse = await loginUser(data);
      if (response.success) {
        showToast(response.data);
        navigate('/dashboard');
      }
    } catch (error: IApiResponse | any) {
      handleValidationErrors<ILogin>(error, setError);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input 
          id="email" 
          label="Email" 
          type="email" 
          placeholder="Enter Email" 
          register={register} 
          error={errors.email} 
        />

        <Input 
          id="password" 
          label="Password" 
          type="password" 
          placeholder="Enter Password" 
          register={register} 
          error={errors.password} 
          showPassword={showPassword} 
        />

      <div className="show-password-label">
        <input
          type="checkbox"
          id="showPassword"
          onChange={togglePasswordVisibility}
          checked={showPassword}
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>

        <div className="form-group">
          <button type="submit">Login</button>
        </div>

      </form>
      
      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>

    </div>
  );
}

export default Login;
