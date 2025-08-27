import { AxiosError } from "axios";
import { API } from "../config/axios-config";
import {
  BaseResponse,
  LessonResponse,
  StudentDetailsResponse,
  UserResponse,
} from "../interfaces";
import { AssignLessonFormData, CreateStudentFormData } from "../schemas";

const API_PATHS = {
  ADD_STUDENT: import.meta.env
    .VITE_API_CLASSROOM_APP_PATH_INSTRUCTOR_ADD_STUDENT as string,
  ASSIGN_LESSON: import.meta.env
    .VITE_API_CLASSROOM_APP_PATH_INSTRUCTOR_ASSIGN_LESSON as string,
  GET_LESSONS: import.meta.env
    .VITE_API_CLASSROOM_APP_PATH_INSTRUCTOR_GET_LESSONS as string,
  GET_STUDENTS: import.meta.env
    .VITE_API_CLASSROOM_APP_PATH_INSTRUCTOR_GET_STUDENTS as string,
  GET_A_STUDENT: import.meta.env
    .VITE_API_CLASSROOM_APP_PATH_INSTRUCTOR_GET_A_STUDENT as string,
  EDIT_STUDENT: import.meta.env
    .VITE_API_CLASSROOM_APP_PATH_INSTRUCTOR_EDIT_STUDENT as string,
  DELETE_STUDENT: import.meta.env
    .VITE_API_CLASSROOM_APP_PATH_INSTRUCTOR_DELETE_STUDENT as string,
};

// API GET ALL STUDENTS
export const handleFetchStudents = async (): Promise<
  UserResponse | undefined
> => {
  try {
    const res = await API.get(API_PATHS.GET_STUDENTS);
    if (res.status === 200) {
      return {
        code: res.status,
        success: res.data.success,
        message: res.data.message,
        ...res.data,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status ?? 500,
        success: false,
        message: error.response?.data.message ?? "Unknown error",
        data: [],
      };
    }
  }
};

// API VIEW DETAILS STUDENTS
export const handleViewDetailsStudent = async (
  phone: string
): Promise<StudentDetailsResponse | undefined> => {
  try {
    const response = await API.get(`${API_PATHS.GET_A_STUDENT}/${phone}`);
    if (response.status === 200) {
      return {
        code: response.status,
        success: response.data.success,
        message: response.data.message,
        ...response.data,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.code,
        message: error.response?.data.message,
        success: false,
      };
    }
  }
};

// API ADD STUDENT
export const handleRequestAddStudent = async (
  data: CreateStudentFormData
): Promise<BaseResponse | undefined> => {
  try {
    const response = await API.post(API_PATHS.ADD_STUDENT, data);
    if (response.status === 200) {
      return {
        code: response.status,
        success: response.data.success,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.code,
        message: error.response?.data.message,
        success: false,
      };
    }
  }
};

// API EDIT STUDENT
export const handleRequestEditStudent = async (
  phone: string,
  data: CreateStudentFormData
): Promise<BaseResponse | undefined> => {
  try {
    const response = await API.put(`${API_PATHS.EDIT_STUDENT}/${phone}`, data);
    if (response.status === 200) {
      return {
        code: response.status,
        success: response.data.success,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.code,
        message: error.response?.data.message,
        success: false,
      };
    }
  }
};

// API DELETE STUDENT
export const handleRequestDeleteStudent = async (
  phone: string
): Promise<BaseResponse | undefined> => {
  try {
    const response = await API.delete(`${API_PATHS.DELETE_STUDENT}/${phone}`);
    if (response.status === 200) {
      return {
        code: response.status,
        success: response.data.success,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.code,
        message: error.response?.data.message,
        success: false,
      };
    }
  }
};

// API GET LESSONS
export const handleFetchLessons = async (): Promise<
  LessonResponse | undefined
> => {
  try {
    const res = await API.get(API_PATHS.GET_LESSONS);
    if (res.status === 200) {
      return {
        code: res.status,
        success: res.data.success,
        message: res.data.message,
        ...res.data,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status ?? 500,
        success: false,
        message: error.response?.data.message ?? "Unknown error",
        data: [],
      };
    }
  }
};

// API ASSIGN LESSON
export const handleAssignLesson = async (
  data: AssignLessonFormData
): Promise<BaseResponse | undefined> => {
  try {
    const response = await API.post(API_PATHS.ASSIGN_LESSON, data);
    if (response.status === 200) {
      return {
        code: response.status,
        success: response.data.success,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.code,
        message: error.response?.data.message,
        success: false,
      };
    }
  }
};
