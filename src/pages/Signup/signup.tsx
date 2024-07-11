import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { signupSchema } from 'utils/validationSchema';
import { signupUser } from 'api/user';
import { IApiResponse, ISignup } from 'utils/interface';
import showToast from 'utils/toastMessage';
import './style.css';

function Signup () {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ISignup>({
    resolver: yupResolver(signupSchema),
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<ISignup> = async (data) => {
    try {
      const response : IApiResponse = await signupUser(data);
      if (response.success) {
        showToast(response);
        navigate('/login');
      }
    } catch (error: IApiResponse | any) {
      showToast(error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter First name"
            {...register('firstName')}
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && <AiFillExclamationCircle className="error-icon" />}
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter Last name"
            {...register('lastName')}
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && <AiFillExclamationCircle className="error-icon" />}
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            placeholder="Enter User name"
            {...register('userName')}
            className={errors.userName ? 'input-error' : ''}
          />
          {errors.userName && <AiFillExclamationCircle className="error-icon" />}
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Enter Confirm password"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'input-error' : ''}
            />
          </div>
          {errors.confirmPassword && <AiFillExclamationCircle className="error-icon" />}
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="show-password-label">
          <label htmlFor="showPassword">Show Password</label>
          <input
            type="checkbox"
            id="showPassword"
            onChange={togglePasswordVisibility}
          />
        </div>
        <div className="form-group">
          <button type="submit">Signup</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
