import { useState } from "react";
import { X, Check } from "lucide-react";
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

  const isChanged = selectedStatus !== job.status;

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Panel Header */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Job Details
          </span>
          <h2 className="text-lg font-bold text-slate-900">{job.id}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{job.product}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Specifications */}
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="text-xs text-slate-500">Customer</span>
          <span className="text-xs font-medium text-slate-800 text-right">{job.customer}</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="text-xs text-slate-500">Quantity</span>
          <span className="text-xs font-semibold text-slate-800 font-mono">
            {Number(job.quantity).toLocaleString()} pcs
          </span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="text-xs text-slate-500">Due Date</span>
          <span className="text-xs font-medium text-slate-800">{job.dueDate}</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="text-xs text-slate-500">Machine</span>
          <span className="text-xs font-medium text-slate-800">
            {job.machine || "Unassigned"}
          </span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="text-xs text-slate-500">Current Status</span>
          <StatusBadge status={job.status} />
        </div>

        {/* Notes */}
        <div className="pt-1">
          <span className="text-xs font-medium text-slate-500">Notes & Logs</span>
          <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs text-slate-700 leading-relaxed">
            {job.notes || "No special instructions or issues logged."}
          </div>
        </div>
      </div>

      {/* Update Status Control */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <label htmlFor="update-status-select" className="mb-1.5 block text-xs font-medium text-slate-600">
          Change Status
        </label>
        <select
          id="update-status-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors"
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
          disabled={!isChanged}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer transition-colors"
        >
          <Check className="h-4 w-4" />
          <span>{isChanged ? "Save Status" : "Current Status"}</span>
        </button>
      </div>
    </div>
  );
}

export { JobDetailPanel };
export default JobDetailPanel;
