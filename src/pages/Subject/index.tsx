import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { subjectSchema } from 'utils/validationSchema';
import { ICreateSubject } from 'utils/types';
import Input from 'components/Input';
import 'pages/Subject/style.css';

interface ISubjectProps{
  loading: boolean
  createSubject: (data: ICreateSubject) => void;
}

const Subject  = ({ loading, createSubject }: ISubjectProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateSubject>({
    resolver: yupResolver(subjectSchema),
    mode: 'onBlur',
  });
  
  const onSubmit: SubmitHandler<ICreateSubject> = async (data) => {
    createSubject(data)
    navigate('/dashboard');
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