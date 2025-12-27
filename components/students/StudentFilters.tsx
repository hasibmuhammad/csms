import { GENDER_OPTIONS, STATUS_OPTIONS } from "@/constants";
import { IFilters } from "@/types";
import { Filter, Search } from "lucide-react";

interface IStudentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: IFilters;
  onFilterChange: (filters: IFilters) => void;
  availableCourses: string[];
  onApplyFilters: () => void;
}

const StudentFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  availableCourses,
  onApplyFilters,
}: IStudentFiltersProps) => {
  return (
    <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-80">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </span>
        <input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder="Search by name or course..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-100 transition-all"
        />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <select
          value={filters.gender || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, gender: e.target.value })
          }
          className="px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-100"
        >
          <option value={""}>Gender</option>
          {GENDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={filters.course || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, course: e.target.value })
          }
          className="px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-100"
        >
          <option value={""}>Course</option>
          {availableCourses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <select
          value={filters.status || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-100"
        >
          <option value={""}>Status</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={onApplyFilters}
          className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors"
        >
          <Filter size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudentFilters;
