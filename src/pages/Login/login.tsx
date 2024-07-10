import React from 'react';
import { useLogin } from './index';
import './style.css';

const Login = () => {
  const { register, handleSubmit, errors, onSubmit } = useLogin();

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input 
            type="email" 
            placeholder="Email" 
            {...register('email')} 
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            {...register('password')} 
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
