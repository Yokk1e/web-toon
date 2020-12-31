export interface RegisterForm {
  email?: string;
  userName?: string;
  password?: string;
  confirmPassword?: string;
  gender?: GenderType;
  age?: number;
}

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female'
}
