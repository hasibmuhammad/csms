'use client';

import Modal from '@/components/ui/Modal';
import MultiStepStudentForm from '@/components/MultiStepStudentForm';
import { Eye, Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const StudentsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const students = [
    { id: 'STU001', name: 'James Wilson', email: 'james.w@college.edu', course: 'B.Sc Computer Science', year: '3rd Year', status: 'Enrolled', phone: '+1 234 567 890' },
    { id: 'STU002', name: 'Sarah Chen', email: 's.chen@college.edu', course: 'BA Psychology', year: '2nd Year', status: 'Pending', phone: '+1 234 567 891' },
    { id: 'STU003', name: 'Michael Ross', email: 'm.ross@college.edu', course: 'B.Com Accounting', year: '1st Year', status: 'Enrolled', phone: '+1 234 567 892' },
    { id: 'STU004', name: 'Elena Rodriguez', email: 'elena.r@college.edu', course: 'B.Sc Physics', year: '4th Year', status: 'On Leave', phone: '+1 234 567 893' },
    { id: 'STU005', name: 'David Kim', email: 'd.kim@college.edu', course: 'B.Tech Engineering', year: '2nd Year', status: 'Enrolled', phone: '+1 234 567 894' },
    { id: 'STU006', name: 'Olivia Pratt', email: 'o.pratt@college.edu', course: 'B.A English', year: '3rd Year', status: 'Graduated', phone: '+1 234 567 895' },
    { id: 'STU007', name: 'Lucas Hedges', email: 'l.hedges@college.edu', course: 'B.Sc Biology', year: '1st Year', status: 'Enrolled', phone: '+1 234 567 896' },
    { id: 'STU008', name: 'Mia Wong', email: 'm.wong@college.edu', course: 'B.Des Design', year: '4th Year', status: 'Enrolled', phone: '+1 234 567 897' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
          <p className="text-gray-500 mt-1">Manage and view all students enrolled in the college.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
          <Plus size={18} />
          Add New Student
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by name or course..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-100 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select className="px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-100">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <select className="px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-100">
              <option>Course</option>
              <option>Course1</option>
              <option>Course2</option>
            </select>
            <select className="px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-100">
              <option>Status</option>
              <option>Active</option>
              <option>Deleted</option>
            </select>
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course & Year</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-800">{student.course}</p>
                    <p className="text-xs text-blue-600 font-semibold mt-1">{student.year}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 font-medium whitespace-nowrap">{student.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{student.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide ${
                      student.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-700' : 
                      student.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 
                      student.status === 'Graduated' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Profile">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="View Profile">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing <span className="font-bold text-gray-800">1-8</span> of <span className="font-bold text-gray-800">420</span> students</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Student">
        <MultiStepStudentForm onSuccess={() => setIsOpen(false)} onCancel={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default StudentsPage;
