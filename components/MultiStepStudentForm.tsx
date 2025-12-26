"use client";

import { StudentFormData } from '@/types';
import { studentSchema } from '@/utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookOpen, Check, ChevronLeft, ChevronRight, Fingerprint, User } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const steps = [
  { id: 'basic', title: 'Basic Info', icon: <User size={18} /> },
  { id: 'academic', title: 'Academic Info', icon: <BookOpen size={18} /> },
  { id: 'personal', title: 'Personal Info', icon: <Fingerprint size={18} /> },
];

const MultiStepStudentForm = ({ onSuccess, onCancel }: IProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    mode: 'onChange',
    defaultValues: {
      status: 'Active',
      hobby: 'Reading',
    }
  });

  const nextStep = async () => {

    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const getFieldsForStep = (step: number): (keyof StudentFormData)[] => {
    switch (step) {
      case 0: return ['name', 'age', 'gender'];
      case 1: return ['course', 'admissionDate', 'status'];
      case 2: return ['hobby'];
      default: return [];
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));


  const onSubmit = (data: StudentFormData) => {
    const studentData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Form Data:', studentData);
    onSuccess();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div key="step-0" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Name</label>
              <input 
                {...register('name')}
                type="text" 
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20'}`} 
                placeholder="John Doe" 
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Age</label>
              <input 
                {...register('age', { valueAsNumber: true })}
                min={0} 
                type="number" 
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${errors.age ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20'}`} 
                placeholder="20" 
              />
              {errors.age && <p className="text-xs text-red-500 font-medium">{errors.age.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Gender</label>
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input {...register('gender')} type="radio" value="Male" className="w-4 h-4 cursor-pointer accent-blue-600" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input {...register('gender')} type="radio" value="Female" className="w-4 h-4 cursor-pointer accent-blue-600" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Female</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input {...register('gender')} type="radio" value="Other" className="w-4 h-4 cursor-pointer accent-blue-600" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Other</span>
                </label>
              </div>
              {errors.gender && <p className="text-xs text-red-500 font-medium">{errors.gender.message}</p>}
            </div>
          </div>
        );
      case 1:
        return (
          <div key="step-1" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Course</label>
              <input 
                {...register('course')}
                type="text" 
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${errors.course ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20'}`} 
                placeholder="B.Sc Computer Science" 
              />
              {errors.course && <p className="text-xs text-red-500 font-medium">{errors.course.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Admission Date</label>
              <input 
                {...register('admissionDate')}
                type="date" 
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${errors.admissionDate ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20'}`} 
              />
              {errors.admissionDate && <p className="text-xs text-red-500 font-medium">{errors.admissionDate.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Status</label>
              <select 
                {...register('status')}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${errors.status ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20'}`}
              >
                <option value="Active">Active</option>
                <option value="Deleted">Deleted</option>
              </select>

              {errors.status && <p className="text-xs text-red-500 font-medium">{errors.status.message}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div key="step-2" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Hobby</label>
              <select 
                {...register('hobby')}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${errors.hobby ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:ring-blue-500/20'}`}
              >
                <option value="Reading">Reading</option>
                <option value="Travelling">Travelling</option>
                <option value="Movies">Movies</option>
                <option value="Games">Games</option>
              </select>
              {errors.hobby && <p className="text-xs text-red-500 font-medium">{errors.hobby.message}</p>}
            </div>
          </div>
        );
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
            onClick={currentStep === 0 ? onCancel : prevStep}
            className="cursor-pointer px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all flex items-center gap-2"
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
            onClick={currentStep === steps.length - 1 ? handleSubmit(onSubmit) : nextStep}
            className="cursor-pointer px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? 'Complete Registration' : (
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

export default MultiStepStudentForm;
