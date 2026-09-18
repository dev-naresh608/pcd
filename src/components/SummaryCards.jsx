import {
  ClipboardList,
  AlertTriangle,
  CalendarClock,
  CheckCircle,
} from "lucide-react";
import mockData from "@/data/mockJobs";

function SummaryCard({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-600">
        <Icon className="h-5 w-5" />
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

  const cards = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: ClipboardList,
    },
    {
      label: "Delayed Jobs",
      value: delayedJobs,
      icon: AlertTriangle,
    },
    {
      label: "Due Today",
      value: dueToday,
      icon: CalendarClock,
    },
    {
      label: "Completed Jobs",
      value: completedJobs,
      icon: CheckCircle,
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
