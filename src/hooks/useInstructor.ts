import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BaseResponse,
  LessonResponse,
  StudentDetailsResponse,
  UserResponse,
} from "../interfaces";
import {
  handleAssignLesson,
  handleFetchLessons,
  handleFetchStudents,
  handleRequestAddStudent,
  handleRequestDeleteStudent,
  handleRequestEditStudent,
  handleViewDetailsStudent,
} from "../apis";
import { AssignLessonFormData, CreateStudentFormData } from "../schemas";

// custom hook for get all students
export const useFetchStudents = () => {
  return useQuery<UserResponse | undefined>({
    queryKey: ["students"],
    queryFn: handleFetchStudents,
    staleTime: 1000 * 60 * 24 * 10,
    refetchOnWindowFocus: true,
  });
};

// custom hook for view details a student
export const useViewStudentDetails = (phone?: string) => {
  return useQuery<StudentDetailsResponse | undefined>({
    queryKey: ["student", phone],
    queryFn: async () => {
      if (!phone) return;
      return await handleViewDetailsStudent(phone);
    },
    staleTime: 1000 * 60 * 24 * 10,
    refetchOnWindowFocus: true,
    enabled: !!phone,
  });
};

// custom hook for get all lessons
export const useFetchLessons = () => {
  return useQuery<LessonResponse | undefined>({
    queryKey: ["lessons"],
    queryFn: handleFetchLessons,
    staleTime: 1000 * 60 * 24 * 10,
    refetchOnWindowFocus: true,
  });
};

type CreateStudent = {
  mode: "create";
  data: CreateStudentFormData;
};

type UpdateStudent = {
  mode: "edit";
  phone: string;
  data: CreateStudentFormData;
};

type DeleteStudent = {
  mode: "delete";
  phone: string;
};

type StudentMutationArgs = CreateStudent | UpdateStudent | DeleteStudent;

const mutationFn = async (
  args: StudentMutationArgs
): Promise<BaseResponse | undefined> => {
  if (args.mode === "create") {
    return await handleRequestAddStudent(args.data);
  }

  if (args.mode === "delete") {
    return await handleRequestDeleteStudent(args.phone);
  }
  // mode === "edit"
  return await handleRequestEditStudent(args.phone, args.data);
};

// custom hook for create, edit, detail student
export const useStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student-mutation"],
    mutationFn,
    onSuccess: async (_, variables) => {
      if (variables.mode === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["student", variables.phone],
        });
      }

      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
};

const assignLessonMutationFn = async (args: {
  data: AssignLessonFormData;
}): Promise<BaseResponse | undefined> => {
  return await handleAssignLesson(args.data);
};

// custom hook for assign lesson
export const useAssignLessonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["assign-lesson"],
    mutationFn: assignLessonMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
    },
  });
};
