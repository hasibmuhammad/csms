"use client";

import { BookOpen, Check, ChevronLeft, ChevronRight, Fingerprint, User } from 'lucide-react';
import React, { useState } from 'react';

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

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div key="step-0" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Name</label>
              <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="John Doe" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Age</label>
              <input min={0} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="20" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Gender</label>
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="gender" value="Male" className="w-4 h-4 cursor-pointer accent-blue-600" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="gender" value="Female" className="w-4 h-4 cursor-pointer accent-blue-600" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Female</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="gender" value="Other" className="w-4 h-4 cursor-pointer accent-blue-600" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Other</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div key="step-1" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Course</label>
              <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="B.Sc Computer Science" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Admission Date</label>
              <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Status</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option value="active">Active</option>
                <option value="deleted">Deleted</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div key="step-2" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Hobby</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option>Reading</option>
                <option>Travelling</option>
                <option>Movies</option>
                <option>Games</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
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
            onClick={currentStep === steps.length - 1 ? onSuccess : nextStep}
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
