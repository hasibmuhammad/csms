import z from 'zod';

export const studentSchema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),

  age: z.number({ message: "Age is required" }).min(16, "Age must be at least 16").max(60, "Age must be less than 60"),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender is required",
  }),
  course: z.string().min(2, "Course is required"),

  admissionDate: z.string().min(1, "Admission date is required").refine((date) => new Date(date) <= new Date(), {
    message: "Admission date cannot be in the future",
  }),

  status: z.enum(["Active", "Inactive"]),
  hobby: z.enum(["Reading", "Travelling", "Movies", "Games"]),
});