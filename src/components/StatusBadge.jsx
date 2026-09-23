import { Clock, PlayCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

const STATUS_CONFIG = {
  Pending: {
    bg: "bg-zinc-100 text-zinc-700 border-zinc-200/80",
    dot: "bg-zinc-400",
    icon: Clock,
  },
  "In Progress": {
    bg: "bg-orange-50 text-orange-700 border-orange-200/90",
    dot: "bg-orange-500",
    icon: PlayCircle,
  },
  Delayed: {
    bg: "bg-rose-50 text-rose-700 border-rose-200/90",
    dot: "bg-rose-500 animate-pulse",
    icon: AlertTriangle,
  },
  Completed: {
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200/90",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
};

const DEFAULT_CONFIG = {
  bg: "bg-zinc-50 text-zinc-600 border-zinc-200",
  dot: "bg-zinc-400",
  icon: Clock,
};

function StatusBadge({ status }) {
  const safeStatus = typeof status === "string" ? status : "";
  const config = STATUS_CONFIG[safeStatus] || DEFAULT_CONFIG;
  const label = STATUS_CONFIG[safeStatus] ? safeStatus : "Unknown";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap shadow-2xs ${config.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span>{label}</span>
    </span>
  );
}

export { StatusBadge };
export default StatusBadge;
