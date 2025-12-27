const StudentPagination = () => {
    return (
      <div className="p-4 border-t border-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold text-gray-800">1-8</span> of{" "}
          <span className="font-bold text-gray-800">420</span> students
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-sm">
            1
          </button>
          <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default StudentPagination;
