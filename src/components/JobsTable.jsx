import { useState, useMemo } from "react";
import JobRow from "@/components/JobRow";
import { Layers, RotateCcw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const COLUMNS = [
  { key: "id", label: "Job ID" },
  { key: "product", label: "Product Name" },
  { key: "customer", label: "Customer" },
  { key: "quantity", label: "Quantity" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status" },
  { key: "machine", label: "Assigned Machine" },
  { key: "action", label: "" },
];

const PAGE_SIZE_OPTIONS = [5, 8, 10, 25];

function JobsTable({ jobs = [], onRowClick, selectedJobId, onClearFilters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [prevJobs, setPrevJobs] = useState(jobs);
  if (prevJobs !== jobs) {
    setPrevJobs(jobs);
    setCurrentPage(1);
  }

  const totalJobs = jobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalJobs);
  const paginatedJobs = useMemo(() => {
    return jobs.slice(startIndex, endIndex);
  }, [jobs, startIndex, endIndex]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safePage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (safePage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  if (totalJobs === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-12 text-center shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 border border-orange-200/60 shadow-2xs">
          <Layers className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-bold text-zinc-900">
          No jobs found
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
          Try adjusting your search query or filter options.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-500 shadow-sm shadow-orange-600/20 cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs">
      {/* Table Subheader Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/70 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm font-bold text-zinc-900">
            Jobs
          </h2>
          <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 text-[11px] font-mono font-semibold text-zinc-700">
            {totalJobs} {totalJobs === 1 ? "job" : "jobs"}
          </span>
        </div>
      </div>

      {/* Table Scrollable Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 text-sm whitespace-nowrap">
          <thead className="bg-zinc-50/90 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 text-left font-bold text-[11px] ${
                    col.key === "action" ? "text-right" : ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white">
            {paginatedJobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                onRowClick={onRowClick}
                isSelected={selectedJobId === job.id}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls Bar - only rendered when more than 5 jobs exist */}
      {totalJobs > 5 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-zinc-200 bg-zinc-50/60 px-5 py-3.5 gap-3">
          {/* Left: Showing range */}
          <div className="flex items-center gap-3 text-xs text-zinc-600">
            <span>
              Showing <strong className="font-mono text-zinc-900">{startIndex + 1}</strong> to{" "}
              <strong className="font-mono text-zinc-900">{endIndex}</strong> of{" "}
              <strong className="font-mono text-zinc-900">{totalJobs}</strong> jobs
            </span>

            <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-200">
              <span className="text-zinc-500 hidden md:inline">Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-700 hover:border-zinc-300 focus:border-orange-500 focus:outline-none cursor-pointer shadow-2xs"
              >
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Page Navigation Buttons - only rendered if more than 1 page */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1 self-center sm:self-auto">
              {/* First page button */}
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={safePage === 1}
                title="First page"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-zinc-600 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              {/* Previous page button */}
              <button
                type="button"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                title="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-zinc-600 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1 mx-1">
                {getPageNumbers().map((pageNum, idx) => {
                  if (pageNum === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="flex h-8 w-7 items-center justify-center text-xs font-semibold text-zinc-400 select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive = pageNum === safePage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`flex h-8 min-w-8 px-2 items-center justify-center rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-orange-600 text-white shadow-xs ring-1 ring-orange-600"
                          : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next page button */}
              <button
                type="button"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
                title="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-zinc-600 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Last page button */}
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                disabled={safePage === totalPages}
                title="Last page"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-zinc-600 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { JobsTable };
export default JobsTable;