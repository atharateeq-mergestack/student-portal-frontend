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
  studentName: string;
  marks: number;
  subjectId: { subjectName: string };
  grade: string;
  createdAt: string;
}
export interface ICreateSubject {
  subjectName: string;
  subjectDescription?: string;
}

export interface ICreateResult {
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
