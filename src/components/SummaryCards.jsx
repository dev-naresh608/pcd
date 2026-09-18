import {
  ClipboardList,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";
import mockData from "@/data/mockJobs";

function SummaryCard({
  label,
  value,
  icon: Icon,
  subText,
  iconColor,
  iconBg,
  badgeText,
  badgeClasses,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-150 hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </span>
          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </div>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-500 font-normal truncate">{subText}</span>
        {badgeText && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeClasses}`}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}

function SummaryCards({ jobs = mockData }) {
  const today = new Date().toISOString().slice(0, 10);

  const totalJobs = jobs.length;
  const delayedJobs = jobs.filter((job) => job.status === "Delayed").length;
  const dueToday = jobs.filter((job) => job.dueDate === today).length;
  const completedJobs = jobs.filter((job) => job.status === "Completed").length;
  const completionRate =
    totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  const cards = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: ClipboardList,
      subText: "Active in pipeline",
      badgeText: "All Jobs",
      badgeClasses: "bg-slate-100 text-slate-700",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Delayed Jobs",
      value: delayedJobs,
      icon: AlertTriangle,
      subText: delayedJobs > 0 ? "Requires attention" : "On schedule",
      badgeText: delayedJobs > 0 ? `${delayedJobs} Delayed` : "None",
      badgeClasses:
        delayedJobs > 0
          ? "bg-rose-50 text-rose-700 border border-rose-200/60"
          : "bg-slate-100 text-slate-600",
      iconBg: delayedJobs > 0 ? "bg-rose-50" : "bg-slate-100",
      iconColor: delayedJobs > 0 ? "text-rose-600" : "text-slate-600",
    },
    {
      label: "Due Today",
      value: dueToday,
      icon: CalendarClock,
      subText: dueToday > 0 ? "Due by end of shift" : "No orders due today",
      badgeText: dueToday > 0 ? "Today" : "Normal",
      badgeClasses:
        dueToday > 0
          ? "bg-amber-50 text-amber-700 border border-amber-200/60"
          : "bg-slate-100 text-slate-600",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Completed Jobs",
      value: completedJobs,
      icon: CheckCircle2,
      subText: `${completionRate}% completed`,
      badgeText: `${completedJobs}/${totalJobs}`,
      badgeClasses: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
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
