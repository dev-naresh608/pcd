import JobRow from "@/components/JobRow";
import mockData from "@/data/mockJobs";

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
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No jobs match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm whitespace-nowrap">
        <thead className="bg-slate-50">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-medium text-slate-600 whitespace-nowrap"
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
  );
}

export { JobsTable };
export default JobsTable;