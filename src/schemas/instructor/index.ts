import { z } from "zod";

export const CreateStudentSchema = z.object({
  name: z.string().min(1, "Student Name is required!"),
  email: z.string().email("Email is not valid!").min(1, "Email is required!"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  gender: z
    .number()
    .min(0, "Gender must be Male or Female")
    .max(1, "Gender must be Male or Female"),
  role: z.string().min(1, "Role is required"),
  address: z.string().optional(),
});

export const AssignLessonSchema = z.object({
  studentPhones: z
    .array(z.string().min(10).max(15))
    .min(1, "At least one student phone is required"),
  title: z.string().min(5, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(3, "Description is required")
    .max(500, "Description is too long"),
});

export type CreateStudentFormData = z.infer<typeof CreateStudentSchema>;
export type AssignLessonFormData = z.infer<typeof AssignLessonSchema>;
