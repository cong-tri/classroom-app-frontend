import { BaseResponse } from "../base";

export interface Lesson {
  id: string;
  assigned_to: string;
  assigned_at: string;
  created_at: string;
  description: string;
  lessonId: string;
  status: string;
  title: string;
  updated_at: string;
}

export interface LessonResponse extends BaseResponse {
  data: Lesson[] | [];
}
