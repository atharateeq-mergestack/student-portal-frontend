import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { subjectSchema } from 'utils/validationSchema';
import { ICreateSubject } from 'utils/types';
import { RootState } from 'store';
import { createSubjectRequest } from 'reduxStore/actions/subjectActions';
import Input from 'components/Input';
import 'pages/Subject/style.css';

function Subject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.subjects);
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateSubject>({
    resolver: yupResolver(subjectSchema),
    mode: 'onBlur',
  });
  
  useEffect(() => {
    if (loading) {
      navigate('/dashboard');
    }
  }, [loading, error, navigate]);

  const onSubmit: SubmitHandler<ICreateSubject> = async (data) => {
    dispatch(createSubjectRequest(data));
  };


  return (
    <div className="subject-container">
      <h1>Subject</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input 
          id="subjectName" 
          label="Subject Name" 
          type="text" 
          placeholder="Enter subject name" 
          register={register} 
          error={errors.subjectName} 
        />

        <Input 
          id="subjectDescription" 
          label="Subject Description" 
          type="text" 
          placeholder="Enter subject description" 
          register={register} 
          error={errors.subjectDescription} 
        />

        <div className="form-group">
          <div className="button-group">
            <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit"  disabled={loading} >Add</button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default Subject;
