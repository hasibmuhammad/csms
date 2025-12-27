import { IStudent } from "@/types";
import { Eye, Loader2, Pencil, RotateCcw, Trash2 } from "lucide-react";

interface IStudentTableProps {
  students: IStudent[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onReactivate: (id: string) => void;
}

const StudentTable = ({
  students,
  loading,
  onEdit,
  onDelete,
  onView,
  onReactivate
}: IStudentTableProps) => {
  return (
    <div className="flex-1 overflow-auto">
      <table
        className={`w-full text-left min-w-[800px] md:min-w-full relative border-collapse ${
          loading || !students.length ? "h-full" : ""
        }`}
      >
        <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm shadow-sm">
          <tr className="bg-gray-50/50">
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Course
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Hobby
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {loading ? (
            <tr className="h-full">
              <td colSpan={7} className="h-full">
                <div className="flex flex-col items-center justify-center gap-3 h-full">
                  <Loader2 className="text-blue-600 animate-spin" size={32} />
                  <p className="text-sm text-gray-500 font-medium">
                    Loading students...
                  </p>
                </div>
              </td>
            </tr>
          ) : students.length ? (
            students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {student.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">
                    {student.course}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">
                    {student.age}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">
                    {student.gender}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">
                    {student.hobby}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide ${
                      student.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : student.status === "Inactive"
                        ? "bg-rose-50 text-rose-700"
                        : ""
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(student.id)}
                      className="cursor-pointer p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Profile"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => student.status === 'Active' ? onDelete(student.id) : onReactivate(student.id)}
                      className={`cursor-pointer p-1.5 rounded-lg transition-all ${
                        student.status === "Active"
                          ? "text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                          : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                      title={student.status === "Active" ? "Deactivate" : "Reactivate"}
                    >
                      {student.status === "Active" ? (
                        <Trash2 size={16} />
                      ) : (
                        <RotateCcw size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => onView(student.id)}
                      className="cursor-pointer p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="View Profile"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="h-full">
              <td colSpan={7} className="h-full text-center">
                <div className="flex flex-col items-center justify-center gap-2 h-full">
                  <p className="text-gray-500 font-medium text-lg">
                    No students found!
                  </p>
                  <p className="text-sm text-gray-400">
                    Try adding a new student to the directory.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
