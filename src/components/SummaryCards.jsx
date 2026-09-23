import {
  ClipboardList,
  AlertTriangle,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";
import { useJobsContext } from "@/context";

function SummaryCard({
  label,
  value,
  icon: Icon,
  subText,
  iconColor,
  iconBg,
  badgeText,
  badgeClasses,
  isSelected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl border bg-white p-5 shadow-xs transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-orange-500 ring-2 ring-orange-500/20 shadow-md"
          : "border-zinc-200/90 hover:border-orange-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            {label}
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-zinc-900 font-mono">
              {value}
            </span>
          </div>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${iconBg} ${iconColor}`}
        >
          <Icon className="h-5 w-5 stroke-[2.2]" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
        <span className="text-zinc-500 font-medium truncate">{subText}</span>
        {badgeText && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${badgeClasses}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {isSelected && (
        <span className="absolute top-2 right-2 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
        </span>
      )}
    </div>
  );
}

function SummaryCards({ jobs }) {
  const { status, setStatus } = useJobsContext();

  const totalJobs = jobs.length;
  const inProgressJobs = jobs.filter((job) => job.status === "In Progress").length;
  const delayedJobs = jobs.filter((job) => job.status === "Delayed").length;
  const completedJobs = jobs.filter((job) => job.status === "Completed").length;

  const completionRate =
    totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  const cards = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: ClipboardList,
      subText: `${inProgressJobs} active in production`,
      badgeText: "All",
      badgeClasses:
        status === "All"
          ? "bg-zinc-200 text-zinc-900 font-bold"
          : "bg-zinc-100 text-zinc-700",
      iconBg: "bg-zinc-100",
      iconColor: "text-zinc-700",
      isSelected: status === "All",
      onClick: () => setStatus("All"),
    },
    {
      label: "In Progress",
      value: inProgressJobs,
      icon: PlayCircle,
      subText: "Active on machine stations",
      badgeText: `${inProgressJobs} Running`,
      badgeClasses:
        status === "In Progress"
          ? "bg-orange-200 text-orange-900 ring-1 ring-orange-500/30 font-bold"
          : "bg-orange-100 text-orange-800",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      isSelected: status === "In Progress",
      onClick: () => setStatus(status === "In Progress" ? "All" : "In Progress"),
    },
    {
      label: "Delayed Jobs",
      value: delayedJobs,
      icon: AlertTriangle,
      subText: delayedJobs > 0 ? "Requires floor attention" : "All on schedule",
      badgeText: delayedJobs > 0 ? `${delayedJobs} Delayed` : "None",
      badgeClasses:
        status === "Delayed"
          ? "bg-rose-200 text-rose-900 ring-1 ring-rose-500/30 font-bold"
          : delayedJobs > 0
          ? "bg-rose-100 text-rose-800 ring-1 ring-rose-500/20"
          : "bg-zinc-100 text-zinc-600",
      iconBg: delayedJobs > 0 ? "bg-rose-50" : "bg-zinc-100",
      iconColor: delayedJobs > 0 ? "text-rose-600" : "text-zinc-500",
      isSelected: status === "Delayed",
      onClick: () => setStatus(status === "Delayed" ? "All" : "Delayed"),
    },
    {
      label: "Completed Jobs",
      value: completedJobs,
      icon: CheckCircle2,
      subText: `${completionRate}% floor completion`,
      badgeText: `${completedJobs}/${totalJobs}`,
      badgeClasses:
        status === "Completed"
          ? "bg-emerald-200 text-emerald-900 ring-1 ring-emerald-500/30 font-bold"
          : "bg-emerald-50 text-emerald-700",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      isSelected: status === "Completed",
      onClick: () => setStatus(status === "Completed" ? "All" : "Completed"),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard key={card.label} {...card} />
      ))}
    </div>
  );
}

export { SummaryCards };
export default SummaryCards;
