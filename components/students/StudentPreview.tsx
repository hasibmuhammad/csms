import { IStudent } from "@/types";
import { BookOpen, Calendar, Clock, Fingerprint, Hash, User } from "lucide-react";

interface IStudentPreviewProps {
  student: IStudent;
}

const StudentPreview = ({ student }: IStudentPreviewProps) => {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-24 w-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-blue-200">
          {initials}
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight">
            {student.name}
          </h2>
          <p className="text-blue-600 font-bold flex items-center justify-center gap-1.5 mt-1">
            <BookOpen size={16} />
            {student.course}
          </p>
          <div className="mt-3">
             <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase ${
                student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' : 
                'bg-rose-50 text-rose-700 ring-1 ring-rose-100'
              }`}>
                {student.status}
              </span> 
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Basic Info Cards */}
        <div className="bg-gray-50/50 p-4 rounded-2xl space-y-1 border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <User size={12} />
            Age
          </p>
          <p className="text-sm font-bold text-gray-800">{student.age} Years Old</p>
        </div>

        <div className="bg-gray-50/50 p-4 rounded-2xl space-y-1 border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Hash size={12} />
            Gender
          </p>
          <p className="text-sm font-bold text-gray-800">{student.gender}</p>
        </div>

        <div className="bg-gray-50/50 p-4 rounded-2xl space-y-1 border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Fingerprint size={12} />
            Hobby
          </p>
          <p className="text-sm font-bold text-gray-800">{student.hobby}</p>
        </div>

        <div className="bg-gray-50/50 p-4 rounded-2xl space-y-1 border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calendar size={12} />
            Admission
          </p>
          <p className="text-sm font-bold text-gray-800">
             {new Date(student.admissionDate).toLocaleDateString('en-US', { 
               month: 'short', 
               day: 'numeric', 
               year: 'numeric' 
             })}
          </p>
        </div>
      </div>

      {/* Timestamps */}
      <div className="pt-6 border-t border-gray-100 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Clock size={12} />
            Created
          </span>
          <span className="text-gray-600">
            {student.createdAt ? new Date(student.createdAt).toLocaleString() : 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Clock size={12} />
            Last Updated
          </span>
          <span className="text-gray-600">
            {student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentPreview;
