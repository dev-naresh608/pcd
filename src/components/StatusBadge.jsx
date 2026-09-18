const STATUS_STYLES = {
  Pending: "bg-slate-50 text-slate-700 border-slate-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Delayed: "bg-rose-50 text-rose-700 border-rose-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const DEFAULT_STYLE = "bg-gray-50 text-gray-600 border-gray-200";

function StatusBadge({ status }) {
  const safeStatus = typeof status === "string" ? status : "";
  const variantClasses = STATUS_STYLES[safeStatus] || DEFAULT_STYLE;
  const label = STATUS_STYLES[safeStatus] ? safeStatus : "Unknown";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${variantClasses}`}
    >
      {label}
    </span>
  );
}

export { StatusBadge };
export default StatusBadge;
