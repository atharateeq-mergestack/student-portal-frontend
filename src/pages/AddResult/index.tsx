import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { omitBy } from 'lodash';

import { resultSchema } from 'utils/validationSchema';
import { ICreateResult, ISubjectsDropDown } from 'utils/types';
import { grades } from 'utils/grades';
import SelectComponent from 'components/SelectComponent';
import Input from 'components/Input';
import 'pages/AddResult/style.css';
import { fetchResultById } from 'api/result';
import showToast from 'utils/toastMessage';

interface IAddResultProps {
  subjects: ISubjectsDropDown[];
  fetched: boolean;
  createResult: (data: ICreateResult) => void;
  updateResult: (data: ICreateResult) => void;
  fetchSubjects: () => void;
}

function AddResult({ subjects, fetched, fetchSubjects, createResult, updateResult }: IAddResultProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get('id');
  const isUpdate = Boolean(studentId);

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<ICreateResult>({
    resolver: yupResolver(resultSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (!fetched) {
      fetchSubjects();
    }
  }, [fetched, fetchSubjects]);


  useEffect(() => {
    const fetchExistingData = async () => {
      if (isUpdate && studentId) {
        const response = await fetchResultById(studentId);        
        if (response.success && response.data) {
          reset({ ...response.data, subjectId: response.data.subjectId._id });
        }else{
          showToast({...response, message:"Record has been deleted.",  success:false})
          navigate('/dashboard');          
        }
      }
    };
    fetchExistingData();
  }, [isUpdate, studentId, reset, navigate]);

  const onSubmit: SubmitHandler<ICreateResult> = async (data) => {
    const filteredData = omitBy(data, (value) => value === '') as ICreateResult;
    if (isUpdate) {
      updateResult(filteredData);
    } else {
      createResult(filteredData);
    }
    navigate('/dashboard');
  };

  return (
    <div className="result-container">
      <h1>{isUpdate ? 'Edit' : 'Add'} Student Data</h1>
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
          name='subjectId'
          options={subjects}
          classNamePrefix="react-select"
          className={errors.subjectId ? 'input-error' : ''}
          placeholder="Select a subject"
          error={errors.subjectId}
          control={control}
        /> 

        <Input 
          id="marks" 
          label="Marks" 
          type="number" 
          placeholder="Enter marks" 
          register={register} 
          error={errors.marks} 
        />

        <SelectComponent
          id="grade"
          label="Subject"
          name='grade'
          options={grades}
          classNamePrefix="react-select"
          className={errors.grade ? 'input-error' : ''}
          placeholder="Select a grade"
          error={errors.grade}
          control={control}
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
