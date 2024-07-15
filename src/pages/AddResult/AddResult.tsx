import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { omitBy } from 'lodash';
import Select from 'react-select';
import { resultSchema } from 'utils/validationSchema';
import { IApiResponse, ICreateResult, ISubject } from 'utils/interface';
import { grades } from 'utils/grades';
import showToast from 'utils/toastMessage';
import './style.css';
import { createResult } from 'api/result';
import { fetchSubjects } from 'api/subject';

function AddResult() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<{ value: string, label: string }[]>([]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateResult>({
    resolver: yupResolver(resultSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchData = async () => {
      const subjectsResponse = await fetchSubjects();
      const formattedSubjects = subjectsResponse.data.map((subject: ISubject) => ({
        value: subject._id,
        label: subject.subjectName,
      }));
      setSubjects(formattedSubjects);
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

  const handleSubjectChange = (selectedOption: any) => {
    setValue('subjectId', selectedOption.value);
  };

  const handleGradeChange = (selectedOption: any) => {
    setValue('grade', selectedOption.value);
  };

  const customStyles = {
    placeholder: (provided: any) => ({
      ...provided,
      color: '#757575',
      fontSize: '13px',
      padding: '10px'
    }),
    indicatorSeparator: () => ({}),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#333',
      fontSize: '13px',
      padding: '10px'
    })
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
          <Select
            id="subjectId"
            options={subjects}
            onChange={handleSubjectChange}
            classNamePrefix="react-select"
            className={errors.subjectId ? 'input-error' : ''}
            placeholder="Select a subject"
            styles={customStyles}
          />
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
          <Select
            id="grade"
            options={grades}
            onChange={handleGradeChange}
            classNamePrefix="react-select"
            className={errors.grade ? 'input-error' : ''}
            placeholder="Select a grade"
            styles={customStyles}
          />
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
}

export default AddResult;
