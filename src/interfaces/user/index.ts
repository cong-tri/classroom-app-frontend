import { BaseResponse } from "../base";
import { Lesson } from "../lesson";

export interface User {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  gender: number;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UserResponse extends BaseResponse {
  data: User[] | [];
}

export interface StudentDetails extends User {
  lessons: Lesson[] | [];
}

export interface StudentDetailsResponse extends BaseResponse {
  data?: StudentDetails;
}
