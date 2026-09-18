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
        <h1 className="text-2xl font-bold text-slate-900">
          Production Control
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor production jobs and factory operations
        </p>
      </div>

      <div className="flex items-center">
        <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm">
          {getFormattedDate()}
        </span>
      </div>
    </div>
  );
}

export { DashboardHeader };
export default DashboardHeader;
