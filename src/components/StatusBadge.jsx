const BASE_CLASSES =
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap";

const STATUS_STYLES = {
  Pending: "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Delayed: "bg-red-100 text-red-700 border-red-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const DEFAULT_STYLE = "bg-gray-100 text-gray-500 border-gray-200";

function StatusBadge({ status }) {
  const safeStatus = typeof status === "string" ? status : "";
  const variantClasses = STATUS_STYLES[safeStatus] || DEFAULT_STYLE;
  const label = STATUS_STYLES[safeStatus] ? safeStatus : "Unknown";

  return <span className={`${BASE_CLASSES} ${variantClasses}`}>{label}</span>;
}

export { StatusBadge };
export default StatusBadge;
