import { Plus } from "lucide-react";

interface IStudentHeaderProps {
  onAddClick: () => void;
}

const StudentHeader = ({ onAddClick }: IStudentHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
        <p className="text-gray-500 mt-1">
          Manage and view all students enrolled in the college.
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
      >
        <Plus size={18} />
        Add New Student
      </button>
    </div>
  );
};

export default StudentHeader;
