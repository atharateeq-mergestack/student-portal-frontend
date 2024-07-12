import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { omitBy } from 'lodash';
import { useEffect, useState } from 'react';
import { resultSchema } from 'utils/validationSchema';
import { IApiResponse, ICreateResult, ISubject } from 'utils/interface';
import { grades } from 'utils/grades';
import showToast from 'utils/toastMessage';
import './style.css';
import { createResult } from 'api/result';
import { fetchSubjects } from 'api/subject';

function AddResult() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<ICreateResult>({
    resolver: yupResolver(resultSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchData = async () => {
      const subjectsResponse = await fetchSubjects();
      setSubjects(subjectsResponse.data);
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<ICreateResult> = async (data) => {
    try {      
      const filteredData = omitBy(data, (value) => value === '') as ICreateResult;
      const response: IApiResponse = await createResult(filteredData);
      if (response.success) {
        showToast(response);
        navigate('/dashboard');
      }
    } catch (error: IApiResponse | any) {
      showToast(error);
    }
  };

  return (
    <div className="result-container">
      <h1>Add Result</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            placeholder="Enter student name"
            {...register('studentName')}
            className={errors.studentName ? 'input-error' : ''}
          />
          {errors.studentName && <AiFillExclamationCircle className="error-icon" />}
          {errors.studentName && <p>{errors.studentName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="subjectId">Subject</label>
          <select id="subjectId" {...register('subjectId')} className={errors.subjectId ? 'input-error' : ''}>
            <option value="">Select subject</option>
            {subjects.map(subject => (
              <option className="special" key={subject._id} value={subject._id}>{subject.subjectName}</option>
            ))}
          </select>
          {errors.subjectId && <AiFillExclamationCircle className="error-icon" />}
          {errors.subjectId && <p>{errors.subjectId.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="marks">Marks</label>
          <input
            type="number"
            id="marks"
            placeholder="Enter marks"
            {...register('marks')}
            className={errors.marks ? 'input-error' : ''}
          />
          {errors.marks && <AiFillExclamationCircle className="error-icon" />}
          {errors.marks && <p>{errors.marks.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <select id="grade" {...register('grade')} className={errors.grade ? 'input-error' : ''}>
            <option value="">Select grade</option>
            {grades.map(grade => (
              <option key={grade.value} value={grade.value}>{grade.label}</option>
            ))}
          </select>
          {errors.grade && <AiFillExclamationCircle className="error-icon" />}
          {errors.grade && <p>{errors.grade.message}</p>}
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

export default AddResult;
