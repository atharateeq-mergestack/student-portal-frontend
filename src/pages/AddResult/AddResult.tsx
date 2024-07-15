import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { omitBy } from 'lodash';
import Select from 'react-select';
import { resultSchema } from 'utils/validationSchema';
import { IApiResponse, ICreateResult, ISubject } from 'utils/interface';
import { grades } from 'utils/grades';
import showToast from 'utils/toastMessage';
import { createResult, updateResult } from 'api/result';
import { fetchSubjects } from 'api/subject';
import './style.css';

function AddResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state?.student;
  const isUpdate = location.state?.isUpdate || false;
  const [subjects, setSubjects] = useState<{ value: string, label: string }[]>([]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateResult>({
    resolver: yupResolver(resultSchema),
    mode: 'onBlur',
    defaultValues: {...existingData, subjectId: existingData?.subjectId._id} || {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsResponse = await fetchSubjects();        
        if (subjectsResponse.data) {
          const formattedSubjects = subjectsResponse.data.map((subject: ISubject) => ({
            value: subject._id,
            label: subject.subjectName,
          }));
          setSubjects(formattedSubjects);
        }
      } catch (error: IApiResponse | any) {
        showToast(error);
      }
    };

    fetchData();
  }, [existingData, setValue]);

  const onSubmit: SubmitHandler<ICreateResult> = async (data) => {
    try {
      const filteredData = omitBy(data, (value) => value === '') as ICreateResult;
      let response: IApiResponse;
      if (isUpdate && existingData) {
        response = await updateResult(existingData._id, filteredData);
      } else {        
        response = await createResult(filteredData);
      }

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
      <h1>{isUpdate ? 'Update' : 'Add'} Result</h1>
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
            defaultValue={ existingData && {value: existingData.subjectId._id, label: existingData.subjectId.subjectName}}
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
            defaultValue={grades.find(grade => grade.value === existingData?.grade)}
          />
          {errors.grade && <AiFillExclamationCircle className="error-icon" />}
          {errors.grade && <p>{errors.grade.message}</p>}
        </div>
        <div className="form-group">
          <div className='button-group'>
            <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit">{isUpdate ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddResult;
