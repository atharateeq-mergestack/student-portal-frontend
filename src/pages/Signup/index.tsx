import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';

import { signupSchema } from 'utils/validationSchema';
import { signupUser } from 'api/user';
import { IApiResponse, ISignup } from 'utils/types';
import showToast from 'utils/toastMessage';
import Input from 'components/Input';
import 'pages/Signup/style.css';
import { handleValidationErrors } from 'utils/handleValidationFieldErrors';

const Signup = ()  => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError, trigger, watch } = useForm<ISignup>({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<ISignup> = async (data) => {
    try {
      const response: IApiResponse = await signupUser(data);
      if (response.success) {
        showToast(response);
        navigate('/login');
      }
    } catch (error: IApiResponse | any) {
      handleValidationErrors<ISignup>(error, setError);
    }
  };
  useEffect(() =>{
    if(password && confirmPassword)
      trigger('confirmPassword');
  }, [password, confirmPassword, trigger])

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input 
          id="firstName" 
          label="First Name" 
          type="text" 
          placeholder="Enter First name" 
          register={register} 
          error={errors.firstName} 
        />
        
        <Input 
          id="lastName" 
          label="Last Name" 
          type="text" 
          placeholder="Enter Last name" 
          register={register} 
          error={errors.lastName} 
        />

        <Input 
          id="userName" 
          label="User Name" 
          type="text" 
          placeholder="Enter User name" 
          register={register} 
          error={errors.userName} 
        />

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

        <Input 
          id="confirmPassword" 
          label="Confirm Password" 
          type="password" 
          placeholder="Enter Confirm password" 
          register={register} 
          error={errors.confirmPassword} 
          showPassword={showPassword} 
        />

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
