interface IProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: IProps) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (totalCount === 0) return null;

  const startIdx = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="p-4 border-t border-gray-50 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Showing <span className="font-bold text-gray-800">{startIdx}-{endIdx}</span> of{" "}
        <span className="font-bold text-gray-800">{totalCount}</span> items
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`cursor-pointer px-3 py-1.5 border rounded-lg text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "border-gray-100 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-3 py-1.5 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
