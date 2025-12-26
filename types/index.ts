import { studentSchema } from '@/utils/validationSchema';
import z from 'zod';

export interface IStudent {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    course: string;
    hobby: 'Reading' | 'Travelling' | 'Movies' | 'Games';
    admissionDate: string;
    status: 'Active' | 'Deleted';
    createdAt?: string;
    updatedAt?: string;
}

export type StudentFormData = z.infer<typeof studentSchema>;