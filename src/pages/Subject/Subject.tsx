import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { omitBy } from 'lodash';

import { subjectSchema } from 'utils/validationSchema';
import { createSubject } from 'api/subject';
import { IApiResponse, ICreateSubject } from 'utils/types';
import showToast from 'utils/toastMessage';
import Input from 'components/Input';
import 'pages/Subject/style.css';

function Subject() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateSubject>({
    resolver: yupResolver(subjectSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ICreateSubject> = async (data) => {
    try {
      const filteredData = omitBy(data, (value) => value === '') as ICreateSubject;
      const response: IApiResponse = await createSubject(filteredData);
      if (response.success) {
        showToast(response);
        navigate('/dashboard');
      }
    } catch (error: IApiResponse | any) {
      showToast(error);
    }
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
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Subject;
