import { useState } from "react";
import { X } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const STATUS_OPTIONS = ["Pending", "In Progress", "Delayed", "Completed"];

function JobDetailPanel({ job, onClose, onUpdateStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(job?.status ?? "Pending");
  const [prevId, setPrevId] = useState(job?.id);

  if (job && job.id !== prevId) {
    setPrevId(job.id);
    setSelectedStatus(job.status);
  }

  if (!job) {
    return null;
  }

  const handleUpdate = () => {
    if (selectedStatus !== job.status) {
      onUpdateStatus(job.id, selectedStatus);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{job.id}</h2>
          <p className="text-sm text-slate-500">{job.product}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Customer</span>
          <span className="font-medium text-slate-800">{job.customer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Quantity</span>
          <span className="font-medium text-slate-800">{job.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Due Date</span>
          <span className="font-medium text-slate-800">{job.dueDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Assigned Machine</span>
          <span className="font-medium text-slate-800">{job.machine || "—"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Current Status</span>
          <StatusBadge status={job.status} />
        </div>
        <div>
          <span className="text-slate-500">Notes / Issues</span>
          <p className="mt-1 rounded-md bg-slate-50 p-2 text-slate-700 text-xs">
            {job.notes || "No notes for this job."}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Update Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={selectedStatus === job.status}
          className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer transition-colors"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}

export { JobDetailPanel };
export default JobDetailPanel;
