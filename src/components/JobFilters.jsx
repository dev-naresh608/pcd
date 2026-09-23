import { Search, RotateCcw, ArrowUpDown, X } from "lucide-react";

const STATUS_TABS = [
  { value: "All", label: "All" },
  { value: "In Progress", label: "In Progress" },
  { value: "Delayed", label: "Delayed" },
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
];

const SORT_OPTIONS = [
  { value: "dueDate", label: "Due Date (Earliest)" },
  { value: "dueDateDesc", label: "Due Date (Latest)" },
  { value: "quantity", label: "Quantity (Highest)" },
  { value: "quantityAsc", label: "Quantity (Lowest)" },
];

function JobFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  jobs = [],
}) {
  const isFiltered = Boolean(
    search.trim() !== "" || status !== "All" || sortBy !== "dueDate"
  );

  // Compute counts for status tabs
  const getCount = (tabStatus) => {
    if (tabStatus === "All") return jobs.length;
    return jobs.filter((j) => j.status === tabStatus).length;
  };

  return (
    <div className="space-y-3.5">
      {/* Top Filter Bar: Status Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-200/80">
          {STATUS_TABS.map((tab) => {
            const count = getCount(tab.value);
            const isActive = status === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onStatusChange(tab.value)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white text-orange-600 shadow-xs ring-1 ring-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isActive
                      ? "bg-orange-100 text-orange-700"
                      : "bg-zinc-200/80 text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer whitespace-nowrap ml-auto"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Bottom Filter Bar: Search + Sort controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by product, customer, or job ID..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-2 pl-9.5 pr-8 text-xs sm:text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Quick Reset */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-zinc-500 hidden md:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="appearance-none rounded-xl border border-zinc-200 bg-white py-2 pl-3 pr-8 text-xs sm:text-sm font-medium text-zinc-700 hover:border-zinc-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer transition-all shadow-2xs"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-zinc-400">
                <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              title="Reset all search filters"
              className="sm:hidden inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 cursor-pointer"
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
