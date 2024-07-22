import { FieldError } from "react-hook-form";
import { StylesConfig } from "react-select";

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IApiResponse {
  data: any;
  message: string | Array<string>;
  success: boolean;
}
 
export interface IResultData {
  _id?: string;
  studentName: string;
  marks: number;
  subjectId: { _id: string ; subjectName: string };
  grade: string;
  createdAt: string;
}
export interface ICreateSubject {
  subjectName: string;
  subjectDescription?: string;
}

export interface ICreateResult {
  _id?: string;
  studentName: string;
  subjectId: string;
  marks: number;
  grade: string;
}
export interface ISubject {
  _id: string;
  subjectName: string;
  subjectDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface  Istats  {
  highestGrade : string;
  mostPassedSubject : string;
  lowestGrade : string;
  mostFailedSubject : string;
}
export interface Result {
  [key: string]: number;
}
 
export interface SelectProps {
  id: string;
  label:string;
  options: { value: string; label: string }[];
  onChange: (selectedOption: any) => void;
  classNamePrefix?: string;
  className?: string;
  placeholder?: string;
  styles?: StylesConfig;
  defaultValue?: { value: string; label: string } | null;
  error?: FieldError;
}

export interface ISubjectsDropDown{ 
  value: string; 
  label: string 
}

export interface SummaryCardProps {
  title: string;
  value: string | number | undefined;
  className: string;
}
