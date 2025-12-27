'use client';

import StudentForm from '@/components/StudentForm/StudentForm';
import StudentFilters from '@/components/Students/StudentFilters';
import StudentHeader from '@/components/Students/StudentHeader';
import StudentPagination from '@/components/Students/StudentPagination';
import StudentPreview from '@/components/Students/StudentPreview';
import StudentTable from '@/components/Students/StudentTable';
import { useDebounce } from '@/hooks/useDebounce';
import Modal from '@/libs/ui/Modal';
import { IFilters, IStudent } from '@/types';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';


const StudentsPage = () => {
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [filters, setFilters] = useState<IFilters>({})
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);


  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const loadStudents = async (query: string = '', filters: IFilters) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    const savedStudents: IStudent[] = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Extract unique courses
    const courses = Array.from(new Set(savedStudents.map(s => s.course))).filter(Boolean).sort();
    setAvailableCourses(courses);

    let filteredStudents = savedStudents.filter(student => 
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.course.toLowerCase().includes(query.toLowerCase())
    );

    if (filters.gender) {
      filteredStudents = filteredStudents.filter(student => student.gender === filters.gender);
    }

    if (filters.course) {
      filteredStudents = filteredStudents.filter(student => student.course === filters.course);
    }

    if (filters.status) {
      filteredStudents = filteredStudents.filter(student => student.status === filters.status);
    }

    setStudents(filteredStudents);
    setLoading(false);
  };

  const handleAddSuccess = () => {
    setIsOpen(false);
    setSelectedStudent(null);
    loadStudents(debouncedSearchTerm, filters);
  };

  const handleDelete = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setOpenDeleteConfirmModal(true);
    }
  };

  const onConfirmDelete = async () => {
    setIsDeleting(true);

    await new Promise(resolve => setTimeout(resolve, 500)); 

    if (!selectedStudent) return;
    
    const savedStudents: IStudent[] = JSON.parse(localStorage.getItem('students') || '[]');
    const updatedStudents = savedStudents.filter((student) => student.id !== selectedStudent.id);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    setOpenDeleteConfirmModal(false);
    setSelectedStudent(null);
    setIsDeleting(false);
    loadStudents(debouncedSearchTerm, filters);
  };

  const handleEdit = (id: string) => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setSelectedStudent(student);
      setIsOpen(true);
    }
  };

  const handleView = (id: string) => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setSelectedStudent(student);
      setIsOpenPreview(true);
    }
  };

  useEffect(() => {
    loadStudents(debouncedSearchTerm, filters);
  }, [debouncedSearchTerm, filters]);

  
  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StudentHeader onAddClick={() => setIsOpen(true)} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">
        <StudentFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          availableCourses={availableCourses}
          onApplyFilters={() => loadStudents(debouncedSearchTerm, filters)}
        />
        
        <StudentTable 
          students={students}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        <StudentPagination />
      </div>
      
      <Modal 
        outsideOff={true}
        title={selectedStudent ? "Edit Student" : "Add New Student"}
        isOpen={isOpen} 
        onClose={() => {
          setIsOpen(false);
          setSelectedStudent(null);
        }} 
      >
        <StudentForm 
          initialData={selectedStudent}
          onSuccess={handleAddSuccess} 
          onCancel={() => {
            setIsOpen(false);
            setSelectedStudent(null);
          }} 
        />
      </Modal>

      <Modal 
        title="View Student Info"
        isOpen={isOpenPreview} 
        onClose={() => {
          setIsOpenPreview(false);
          setSelectedStudent(null);
        }} 
      >
        {selectedStudent && <StudentPreview student={selectedStudent} />}
      </Modal>

      <Modal 
        title="Confirm Deletion"
        isOpen={openDeleteConfirmModal} 
        onClose={() => {
          setOpenDeleteConfirmModal(false);
          setSelectedStudent(null);
        }} 
        footer={
          <>
            <button 
              disabled={isDeleting}
              onClick={() => {
                setOpenDeleteConfirmModal(false);
                setSelectedStudent(null);
              }}
              className="cursor-pointer px-6 py-2.5 text-sm font-bold text-gray-500 bg-gray-100 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button 
              disabled={isDeleting}
              onClick={onConfirmDelete}
              className="cursor-pointer px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                'Confirm Delete'
              )}
            </button>
          </>
        }
      >
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <div className="h-16 w-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Trash2 size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Are you sure?</h3>
            <p className="text-gray-500 mt-2">
              You are about to delete <span className="font-bold text-gray-900">{selectedStudent?.name}</span>. 
              This action cannot be undone and will remove all associated data.
            </p>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default StudentsPage;
