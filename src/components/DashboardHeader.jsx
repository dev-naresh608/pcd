import { Calendar } from "lucide-react";

function getFormattedDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DashboardHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Production Control
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor shop floor operations, job orders, and real-time statuses
        </p>
      </div>

      <div className="flex items-center">
        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-xs">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>{getFormattedDate()}</span>
        </span>
      </div>
    </div>
  );
}

export { DashboardHeader };
export default DashboardHeader;
