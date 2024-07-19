import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { omitBy } from 'lodash';
import { useDispatch,  useSelector } from 'react-redux';

import { resultSchema } from 'utils/validationSchema';
import { ICreateResult, IResultData } from 'utils/types';
import { grades } from 'utils/grades';
import { RootState } from 'store';
import { fetchSubjectsRequest } from 'reduxStore/actions/subjectActions';
import { createResultRequest, updateResultRequest } from 'reduxStore/actions/resultActions';
import SelectComponent from 'components/SelectComponent';
import Input from 'components/Input';
import 'pages/AddResult/style.css';

function AddResult() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const existingData : IResultData = location.state?.student;
  const isUpdate : boolean = location.state?.isUpdate || false;
  const { subjects, fetched} = useSelector((state : RootState) => state.subjects);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateResult>({
    resolver: yupResolver(resultSchema),
    mode: 'onBlur',
    defaultValues: { ...existingData, subjectId: existingData?.subjectId._id } || {}
  });

  useEffect(() => {  
    if(!fetched)  {
      dispatch(fetchSubjectsRequest());
    }
  }, [dispatch, fetched, subjects]);

  const onSubmit: SubmitHandler<ICreateResult> = async (data) => {
    const filteredData = omitBy(data, (value) => value === '') as ICreateResult;
    if (isUpdate && existingData) {
      dispatch(updateResultRequest({ ...existingData, ...filteredData }));
    } else {
      dispatch(createResultRequest(filteredData));
    }
    navigate('/dashboard');
  };

  const handleSubjectChange = (selectedOption: any) => {
    setValue('subjectId', selectedOption.value);
  };

  const handleGradeChange = (selectedOption: any) => {
    setValue('grade', selectedOption.value);
  };

  return (
    <div className="result-container">
      <h1>{isUpdate ? 'Update' : 'Add'} Student Data</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input 
          id="studentName" 
          label="Student Name" 
          type="text" 
          placeholder="Enter student name" 
          register={register} 
          error={errors.studentName} 
        />

        <SelectComponent
          id="subjectId"
          label="Subject"
          options={subjects}
          onChange={handleSubjectChange}
          classNamePrefix="react-select"
          className={errors.subjectId ? 'input-error' : ''}
          placeholder="Select a subject"
          defaultValue={
            existingData && { value: existingData.subjectId._id, label: existingData.subjectId.subjectName }
          }
          error={errors.subjectId}
        />

        <Input 
          id="marks" 
          label="Marks" 
          type="text" 
          placeholder="Enter marks" 
          register={register} 
          error={errors.marks} 
        />

        <SelectComponent
          id="grade"
          label="Grade"
          options={grades}
          onChange={handleGradeChange}
          classNamePrefix="react-select"
          className={errors.grade ? 'input-error' : ''}
          placeholder="Select a grade"
          defaultValue={grades.find(grade => grade.value === existingData?.grade)}
          error={errors.grade}
        />

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
