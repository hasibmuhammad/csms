'use client';

import StudentForm from '@/components/StudentForm/StudentForm';
import StudentFilters from '@/components/students/StudentFilters';
import StudentHeader from '@/components/students/StudentHeader';
import StudentPagination from '@/components/students/StudentPagination';
import StudentTable from '@/components/students/StudentTable';
import { useDebounce } from '@/hooks/useDebounce';
import Modal from '@/libs/ui/Modal';
import { IFilters, IStudent } from '@/types';
import { useEffect, useState } from 'react';


const StudentsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [filters, setFilters] = useState<IFilters>({})
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);


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

    const updatedStudents = students.filter((student) => student.id !== id);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    loadStudents(debouncedSearchTerm, filters);
  };

  const handleEdit = (id: string) => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setSelectedStudent(student);
      setIsOpen(true);
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

    </div>
  );
};

export default StudentsPage;
