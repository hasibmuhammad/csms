'use client';

import MultiStepStudentForm from '@/components/MultiStepStudentForm';
import Modal from '@/components/ui/Modal';
import { IStudent } from '@/types';
import { Eye, Filter, Loader2, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';


const StudentsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    setStudents(savedStudents);
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAddSuccess = () => {
    setIsOpen(false);
    loadStudents();
  };

  const handleDelete = (id: string) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    loadStudents();
  };


  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

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

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">

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

        <div className="flex-1 overflow-auto">
          <table className={`w-full text-left min-w-[800px] md:min-w-full relative border-collapse ${loading || !students.length ? 'h-full' : ''}`}>


            <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm shadow-sm">

              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Hobby</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {
                loading ? (
                  <tr className="h-full">
                    <td colSpan={7} className="h-full">
                      <div className="flex flex-col items-center justify-center gap-3 h-full">
                        <Loader2 className="text-blue-600 animate-spin" size={32} />
                        <p className="text-sm text-gray-500 font-medium">Loading students...</p>
                      </div>
                    </td>
                  </tr>
                ) : 
                students.length ? 
                  students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{student.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">{student.course}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">{student.age}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">{student.gender}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">{student.hobby}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide ${
                        student.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                        student.status === 'Deleted' ? 'bg-rose-50 text-rose-700' : ''
                      }`}>
                        {student.status}
                      </span> 
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Profile">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="View Profile">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr className="h-full">
                    <td colSpan={7} className="h-full text-center">
                      <div className="flex flex-col items-center justify-center gap-2 h-full">
                        <p className="text-gray-500 font-medium text-lg">No students found!</p>
                        <p className="text-sm text-gray-400">Try adding a new student to the directory.</p>
                      </div>
                    </td>
                  </tr>
                )}



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
        <MultiStepStudentForm onSuccess={handleAddSuccess} onCancel={() => setIsOpen(false)} />
      </Modal>

    </div>
  );
};

export default StudentsPage;
