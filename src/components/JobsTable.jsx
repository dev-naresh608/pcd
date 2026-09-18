import JobRow from "@/components/JobRow";
import mockData from "@/data/mockJobs";
import { Layers } from "lucide-react";

const COLUMNS = [
  { key: "id", label: "Job ID" },
  { key: "product", label: "Product" },
  { key: "customer", label: "Customer" },
  { key: "quantity", label: "Quantity" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status" },
  { key: "machine", label: "Machine" },
];

function JobsTable({ jobs = mockData, onRowClick, selectedJobId }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Layers className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-slate-900">No jobs found</h3>
        <p className="mt-1 text-sm text-slate-500">
          Try adjusting your search query or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
      {/* Table Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Production Orders</h2>
          <p className="text-xs text-slate-500">
            Click on any row to view full details and update status
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm whitespace-nowrap">
          <thead className="bg-slate-50/80">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                onRowClick={onRowClick}
                isSelected={job.id === selectedJobId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { JobsTable };
export default JobsTable;