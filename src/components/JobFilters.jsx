import { Search, RotateCcw } from "lucide-react";

const STATUS_OPTIONS = [
  "All",
  "Pending",
  "In Progress",
  "Delayed",
  "Completed",
];
const SORT_OPTIONS = [
  { value: "dueDate", label: "Due Date" },
  { value: "quantity", label: "Quantity" },
];

function JobFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  onClearFilters,
}) {
  const isFiltered = Boolean(
    search.trim() !== "" || status !== "All" || sortBy !== "dueDate"
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input with Icon */}
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by ID, product, customer..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Dropdowns & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <label htmlFor="filter-status" className="text-xs font-medium text-slate-500 hidden sm:inline">
              Status:
            </label>
            <select
              id="filter-status"
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All Statuses" : option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-xs font-medium text-slate-500 hidden sm:inline">
              Sort:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { JobFilters };
export default JobFilters;
