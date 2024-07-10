import React from 'react';
import { useSignup } from './index';
import './style.css';

const Signup = () => {
  const { register, handleSubmit, errors, onSubmit } = useSignup();

  return (
    <div className="login-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input 
            type="text" 
            placeholder="First name" 
            {...register('firstName')} 
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Last name" 
            {...register('lastName')} 
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div>
          <input 
            type="text" 
            placeholder="User name" 
            {...register('userName')} 
          />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>
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
        <div>
          <input 
            type="password" 
            placeholder="Confirm password" 
            {...register('confirmPassword')} 
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
