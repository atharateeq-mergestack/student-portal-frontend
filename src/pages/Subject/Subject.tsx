import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { omitBy } from 'lodash';
import { subjectSchema } from 'utils/validationSchema';
import { createSubject } from 'api/subject';
import { IApiResponse, ICreateSubject } from 'utils/interface';
import showToast from 'utils/toastMessage';
import './style.css';

function Subject() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateSubject>({
    resolver: yupResolver(subjectSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ICreateSubject> = async (data) => {
    try {      
      const filteredData = omitBy(data, (value) => value === '')as ICreateSubject;
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
        <div className="form-group">
          <label htmlFor="subjectName">Subject Name</label>
          <input
            type="text"
            id="subjectName"
            placeholder="Enter subject name"
            {...register('subjectName')}
            className={errors.subjectName ? 'input-error' : ''}
          />
          {errors.subjectName && <AiFillExclamationCircle className="error-icon" />}
          {errors.subjectName && <p>{errors.subjectName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="subjectDescription">Subject Description</label>
          <input
            type="text"
            id="subjectDescription"
            placeholder="Enter subject description"
            {...register('subjectDescription')}
            className={errors.subjectDescription ? 'input-error' : ''}
          />
          {errors.subjectDescription && <AiFillExclamationCircle className="error-icon" />}
          {errors.subjectDescription && <p>{errors.subjectDescription.message}</p>}
        </div>
        <div className="form-group">
          <div className='button-group'>
          <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
          <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subject;
