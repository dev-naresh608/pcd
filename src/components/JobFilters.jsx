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
    search.trim() !== "" || status !== "All" || sortBy !== "dueDate",
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by Job ID, Product, Customer, or Status"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:max-w-xs"
      />

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All Statuses" : option}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Sort by {option.label}
            </option>
          ))}
        </select>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

export { JobFilters };
export default JobFilters;
