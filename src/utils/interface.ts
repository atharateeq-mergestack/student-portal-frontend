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
  data: string;
  message: string | Array<string>;
  success: boolean;
}
