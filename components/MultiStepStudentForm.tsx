"use client";

import { BookOpen, Check, ChevronLeft, ChevronRight, Fingerprint, User } from 'lucide-react';
import React, { useState } from 'react';

interface MultiStepFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const steps = [
  { id: 'basic', title: 'Basic Info', icon: <User size={18} /> },
  { id: 'academic', title: 'Academic Info', icon: <BookOpen size={18} /> },
  { id: 'personal', title: 'Personal Info', icon: <Fingerprint size={18} /> },
];

const MultiStepStudentForm = ({ onSuccess, onCancel }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-30)0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">First Name</label>
                <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="John" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Last Name</label>
                <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input type="email" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="john.doe@college.edu" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <input type="tel" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="+1 234 567 890" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Course Selection</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option>B.Sc Computer Science</option>
                <option>BA Psychology</option>
                <option>B.Tech Engineering</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Registration Year</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Semester</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <option>Fall 2025</option>
                  <option>Spring 2026</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Student ID (Auto-generated)</label>
              <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-100 rounded-xl text-gray-500" value="STU2025001" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Home Address</label>
              <textarea rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="123 College St, University Town" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Date of Birth</label>
                <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Gender</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stepper */}
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

      {/* Form Content */}
      <div className="min-h-[280px]">
        {renderStepContent()}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-6">
        <button 
          onClick={currentStep === 0 ? onCancel : prevStep}
          className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all flex items-center gap-2"
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
          className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
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
  );
};

export default MultiStepStudentForm;
