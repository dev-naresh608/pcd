import { Calendar, Download, Plus } from "lucide-react";
import { useJobsContext } from "@/context";

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function DashboardHeader({ onOpenCreateModal }) {
  const { filteredJobs } = useJobsContext();

  const handleExportCSV = () => {
    if (!filteredJobs || filteredJobs.length === 0) return;

    const headers = ["Job ID", "Product", "Customer", "Quantity", "Due Date", "Status", "Machine", "Notes"];
    const rows = filteredJobs.map((job) => [
      `"${job.id}"`,
      `"${job.product.replace(/"/g, '""')}"`,
      `"${job.customer.replace(/"/g, '""')}"`,
      job.quantity,
      `"${job.dueDate}"`,
      `"${job.status}"`,
      `"${job.machine || "Unassigned"}"`,
      `"${(job.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `production_jobs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200/80 pb-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Production Control
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Monitor jobs, machine status, and scheduled work orders
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Date Display */}
        <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-2xs">
          <Calendar className="h-3.5 w-3.5 text-orange-500" />
          <span>{getFormattedDate()}</span>
        </div>

        {/* Export CSV */}
        <button
          type="button"
          onClick={handleExportCSV}
          title="Export jobs to CSV"
          className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-zinc-500" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>

        {/* Create Job Modal Trigger */}
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-orange-600/20 hover:bg-orange-500 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>New Job</span>
        </button>
      </div>
    </div>
  );
}

export { DashboardHeader };
export default DashboardHeader;
