"use client";

import { IStudent, StudentFormData } from '@/types';
import { studentSchema } from '@/utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import { BookOpen, Check, ChevronLeft, ChevronRight, Fingerprint, Loader2, User } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AcademicInfo from './Steps/AcademicInfo';
import BasicInfo from './Steps/BasicInfo';
import PersonalInfo from './Steps/PersonalInfo';

interface IProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: IStudent | null;
}

const steps = [
  { id: 'basic', title: 'Basic Info', icon: <User size={18} /> },
  { id: 'academic', title: 'Academic Info', icon: <BookOpen size={18} /> },
  { id: 'personal', title: 'Personal Info', icon: <Fingerprint size={18} /> },
];

const StudentForm = ({ onSuccess, onCancel, initialData }: IProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isDirty },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    mode: 'onChange',
    defaultValues: initialData || {
      status: 'Active',
      hobby: 'Reading',
      admissionDate: new Date().toISOString().split('T')[0],
    }
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: '',
        age: undefined,
        gender: undefined,
        course: '',
        status: 'Active',
        hobby: 'Reading',
        admissionDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, reset]);

  const getFieldsForStep = (step: number): (keyof StudentFormData)[] => {
    switch (step) {
      case 0: return ['name', 'age', 'gender'];
      case 1: return ['course', 'admissionDate', 'status'];
      case 2: return ['hobby'];
      default: return [];
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));


  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    
    // intentional delay for the loader
    await new Promise(resolve => setTimeout(resolve, 1500));

    const existingStudents: IStudent[] = JSON.parse(localStorage.getItem('students') || '[]');
    
    if (initialData) {
      // Update existing student
      const updatedStudents = existingStudents.map(s => 
        s.id === initialData.id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      );
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    } else {
      // Add new student
      const studentData = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('students', JSON.stringify([...existingStudents, studentData]));
    }
    
    setIsSubmitting(false);
    onSuccess();
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo register={register} errors={errors} />;
      case 1:
        return <AcademicInfo register={register} errors={errors} />;
      case 2:
        return <PersonalInfo register={register} errors={errors} />;
      default:
        return null;
    }
  };


  return (
    <div className="flex flex-col h-[500px]">
      {/* Stepper */}
      <div className="flex-none mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className={`
                  w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${idx <= currentStep ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'}
                  ${idx === currentStep ? 'ring-4 ring-blue-50' : ''}
                `}>
                  {idx < currentStep ? <Check size={20} /> : step.icon}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-black ${idx <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-[2px] mx-4 transition-all duration-500 ${idx < currentStep ? 'bg-blue-600' : 'bg-gray-100'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-1 pr-2 pb-2">
        {renderStepContent()}
      </div>

      {/* Actions */}
      <div className="flex-none mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button 
            disabled={isSubmitting}
            onClick={currentStep === 0 ? onCancel : prevStep}
            className="cursor-pointer px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 0 ? 'Cancel' : (
              <>
                <ChevronLeft size={18} />
                Previous
              </>
            )}
          </button>
          <button 
            type="button"
            disabled={isSubmitting}
            onClick={currentStep === steps.length - 1 ? handleSubmit(onSubmit) : nextStep}
            className="cursor-pointer px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? (
              isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : 'Complete Registration'
            ) : (
              <>
                Next Step
                <ChevronRight size={18} />
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default StudentForm;
