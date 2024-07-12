import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillExclamationCircle} from 'react-icons/ai';
import showToast from 'utils/toastMessage';
import { loginSchema } from 'utils/validationSchema';
import { IApiResponse, ILogin } from 'utils/interface';
import { loginUser } from 'api/user';
import { CONSTANTS } from 'utils/constant';
import './style.css';

function Login () {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
  try {
    const response : IApiResponse = await loginUser(data);
    const token : any = response.data;
    const expirationTime = CONSTANTS.TOKEN_EXPIRE;
    Cookies.set('token', token, { expires: new Date(Date.now() + expirationTime) });
    if (response.success) {
      showToast(response);
      navigate('/dashboard');
    }
  } catch (error: IApiResponse | any) {
    showToast(error);
  }
};


  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            {...register('email')}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <AiFillExclamationCircle className="error-icon" />}
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter Password"
              {...register('password')}
              className={errors.password ? 'input-error' : ''}
            />
          </div>
          {errors.password && <AiFillExclamationCircle className="error-icon" />}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='show-password-label'>
          <label htmlFor="showPassword">Show Password</label>
          <input
            type="checkbox"
            id="showPassword"
            onChange={togglePasswordVisibility}
          />
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
};

export default Login;
