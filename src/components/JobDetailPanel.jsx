import { useState, useEffect } from "react";
import {
  X,
  Check,
  Building2,
  Calendar,
  Cpu,
  Package,
  ExternalLink,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";

const STATUS_OPTIONS = ["Pending", "In Progress", "Delayed", "Completed"];

const LIFECYCLE_STEPS = [
  { step: 1, title: "Booked", desc: "Specs Confirmed" },
  { step: 2, title: "Material", desc: "Stock Staged" },
  { step: 3, title: "Machining", desc: "Active" },
  { step: 4, title: "QA Check", desc: "Inspection" },
  { step: 5, title: "Dispatch", desc: "Ready to Ship" },
];

function getStageIndex(status) {
  switch (status) {
    case "Completed":
      return 5;
    case "In Progress":
      return 3;
    case "Delayed":
      return 2;
    case "Pending":
    default:
      return 1;
  }
}

function JobDetailPanel({ job, onClose, onUpdateStatus, onUpdateNotes }) {
  const [selectedStatus, setSelectedStatus] = useState(job?.status ?? "Pending");
  const [notesText, setNotesText] = useState(job?.notes ?? "");
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState(false);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!job) {
    return null;
  }

  const handleStatusSave = () => {
    if (onUpdateStatus) {
      onUpdateStatus(job.id, selectedStatus);
      setStatusSuccess(true);
      setTimeout(() => setStatusSuccess(false), 2000);
    }
  };

  const handleNotesSave = () => {
    if (onUpdateNotes) {
      onUpdateNotes(job.id, notesText);
      setNotesSuccess(true);
      setTimeout(() => setNotesSuccess(false), 2000);
    }
  };

  const isStatusChanged = selectedStatus !== job.status;
  const isNotesChanged = notesText !== (job.notes || "");
  const currentStage = getStageIndex(job.status);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Slide-over Right Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-zinc-200 animate-slide-in-right">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-200 bg-zinc-50/70 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60">
                  Job Details
                </span>
                <StatusBadge status={job.status} />
              </div>
              <h2 className="mt-2 text-xl font-extrabold text-zinc-900 font-mono tracking-tight">
                {job.id}
              </h2>
              <p className="text-xs text-zinc-600 font-medium mt-0.5">{job.product}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 cursor-pointer transition-colors"
              title="Close panel (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Progress Tracker */}
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                Production Progress
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {LIFECYCLE_STEPS.map((step) => {
                  const isDone = currentStage >= step.step;
                  const isCurrent = currentStage === step.step;
                  return (
                    <div key={step.step} className="flex flex-col items-center">
                      <div
                        className={`h-2 w-full rounded-full mb-1.5 transition-all ${
                          isDone
                            ? "bg-orange-500"
                            : "bg-zinc-200"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-bold ${
                          isCurrent
                            ? "text-orange-600"
                            : isDone
                            ? "text-zinc-800"
                            : "text-zinc-400"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Specifications
              </h3>
              <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white">
                <div className="flex items-center justify-between p-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Building2 className="h-4 w-4 text-zinc-400" />
                    <span>Customer</span>
                  </div>
                  <span className="font-semibold text-zinc-800 text-right">
                    {job.customer}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Package className="h-4 w-4 text-zinc-400" />
                    <span>Quantity</span>
                  </div>
                  <span className="font-bold text-zinc-900 font-mono">
                    {Number(job.quantity).toLocaleString()} pcs
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <span>Due Date</span>
                  </div>
                  <span className="font-semibold text-zinc-800 font-mono">
                    {job.dueDate}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Cpu className="h-4 w-4 text-zinc-400" />
                    <span>Assigned Machine</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200/50">
                    {job.machine || "Unassigned"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Update Action */}
            <div className="rounded-xl border border-orange-200/80 bg-orange-50/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="panel-status-select"
                  className="text-xs font-bold uppercase tracking-wider text-orange-800"
                >
                  Update Status
                </label>
                {statusSuccess && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <Check className="h-3 w-3 stroke-[3]" />
                    Saved
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedStatus(opt)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold border transition-all cursor-pointer ${
                      selectedStatus === opt
                        ? "bg-orange-600 text-white border-orange-600 shadow-sm shadow-orange-600/20"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleStatusSave}
                disabled={!isStatusChanged}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95"
              >
                <Check className="h-3.5 w-3.5" />
                <span>{isStatusChanged ? "Save Status" : "Current Status"}</span>
              </button>
            </div>

            {/* Notes / Issues Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Notes & Issues
                </span>
                {notesSuccess && (
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Saved
                  </span>
                )}
              </div>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add notes or report issues..."
                rows={3}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
              />
              {isNotesChanged && (
                <button
                  type="button"
                  onClick={handleNotesSave}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700 cursor-pointer transition-all active:scale-95"
                >
                  <Save className="h-3 w-3" />
                  <span>Save Notes</span>
                </button>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50/80 flex items-center justify-end">
            <Link
              to={`/jobs/${job.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
            >
              <span>View Full Details</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { JobDetailPanel };
export default JobDetailPanel;
