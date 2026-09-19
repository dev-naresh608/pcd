import { useState, useId } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Building2,
  Cpu,
  Package,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Save,
  Check,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Layers,
} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { useJobsContext } from "@/context";

const STATUS_OPTIONS = ["Pending", "In Progress", "Delayed", "Completed"];

const LIFECYCLE_STEPS = [
  { step: 1, title: "Order Booked", desc: "Specifications confirmed" },
  { step: 2, title: "Material Staged", desc: "Raw material ready" },
  { step: 3, title: "Machining", desc: "Floor machining active" },
  { step: 4, title: "Quality Check", desc: "Tolerance inspection" },
  { step: 5, title: "Ready for Dispatch", desc: "Packed & inspected" },
];

function getStageIndex(status) {
  switch (status) {
    case "Completed":
      return 5;
    case "In Progress":
    case "Delayed":
      return 3;
    case "Pending":
    default:
      return 1;
  }
}

export function JobDetailPage() {
  const { id } = useParams();
  const { getJobById, updateJobStatus, updateJobNotes } = useJobsContext();

  const job = getJobById(id);

  const [selectedStatus, setSelectedStatus] = useState(job?.status || "Pending");
  const [notesText, setNotesText] = useState(job?.notes || "");
  const [statusSaveSuccess, setStatusSaveSuccess] = useState(false);
  const [notesSaveSuccess, setNotesSaveSuccess] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const notesTextareaId = useId();

  // If job changed
  const [currentId, setCurrentId] = useState(id);
  if (id !== currentId) {
    setCurrentId(id);
    setSelectedStatus(job?.status || "Pending");
    setNotesText(job?.notes || "");
    setIsEditingNotes(false);
  }

  // Not found view
  if (!job) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-xs">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Job Order Not Found
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            The job with identifier <span className="font-semibold text-slate-800 font-mono">"{id}"</span> does not exist or may have been deleted.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const currentStage = getStageIndex(job.status);
  const isStatusDirty = selectedStatus !== job.status;

  const handleStatusSave = () => {
    if (isStatusDirty) {
      updateJobStatus(job.id, selectedStatus);
      setStatusSaveSuccess(true);
      setTimeout(() => setStatusSaveSuccess(false), 2500);
    }
  };

  const handleNotesSave = () => {
    updateJobNotes(job.id, notesText);
    setIsEditingNotes(false);
    setNotesSaveSuccess(true);
    setTimeout(() => setNotesSaveSuccess(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        {/* Top Navigation & Breadcrumbs Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link
              to="/dashboard"
              className="font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-500">Production Orders</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-900 font-mono">{job.id}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              id="back-to-dashboard-btn"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold font-mono text-blue-700 ring-1 ring-inset ring-blue-700/20">
                {job.id}
              </span>
              <StatusBadge status={job.status} />
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                Due: <strong className="text-slate-700 font-medium">{job.dueDate}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {job.product}
            </h1>
            <p className="text-sm text-slate-500">
              Ordered by <span className="font-semibold text-slate-800">{job.customer}</span> &bull; Production assigned to <span className="font-semibold text-slate-800">{job.machine || "Unassigned"}</span>
            </p>
          </div>

          {/* Production Lifecycle Tracker */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Production Lifecycle Tracker
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time manufacturing stage of this order
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full px-3 py-1 text-xs font-semibold ${
                  job.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : job.status === "Delayed"
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    job.status === "Completed"
                      ? "bg-emerald-500"
                      : job.status === "Delayed"
                      ? "bg-amber-500"
                      : "bg-blue-500 animate-pulse"
                  }`}
                />
                Stage {currentStage} of 5 &bull; {job.status}
              </span>
            </div>

            {/* Stepper Steps */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
                {LIFECYCLE_STEPS.map((step, index) => {
                  const isCompleted = step.step < currentStage || job.status === "Completed";
                  const isCurrent = step.step === currentStage && job.status !== "Completed";
                  const isDelayed = isCurrent && job.status === "Delayed";

                  return (
                    <div
                      key={step.step}
                      className="relative flex md:flex-col items-center md:text-center gap-3 md:gap-2"
                    >
                      {/* Connecting Line between steps */}
                      {index < LIFECYCLE_STEPS.length - 1 && (
                        <div
                          className={`hidden md:block absolute top-4 left-1/2 w-full h-0.5 -z-0 transition-colors ${
                            step.step < currentStage ? "bg-emerald-500" : "bg-slate-200"
                          }`}
                        />
                      )}

                      {/* Step Circle Node */}
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-emerald-600 text-white shadow-xs"
                            : isDelayed
                            ? "bg-amber-500 text-white ring-4 ring-amber-100 shadow-xs"
                            : isCurrent
                            ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs"
                            : "border-2 border-slate-200 bg-white text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4 stroke-[2.5]" />
                        ) : isDelayed ? (
                          <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
                        ) : (
                          <span>{step.step}</span>
                        )}
                      </div>

                      {/* Step Title & Subtitle */}
                      <div className="min-w-0 flex-1 md:flex-initial">
                        <p
                          className={`text-xs font-semibold ${
                            isDelayed
                              ? "text-amber-800 font-bold"
                              : isCurrent
                              ? "text-blue-700 font-bold"
                              : isCompleted
                              ? "text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Customer Account</span>
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Building2 className="h-4 w-4" />
              </div>
            </div>
            <h3 className="mt-2 text-lg font-bold text-slate-900 truncate">
              {job.customer}
            </h3>
            <p className="mt-1 text-xs text-slate-500">Verified Client &bull; Regular Order</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Total Quantity</span>
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <Package className="h-4 w-4" />
              </div>
            </div>
            <h3 className="mt-2 text-lg font-bold text-slate-900 font-mono">
              {Number(job.quantity).toLocaleString()} <span className="text-xs font-normal text-slate-500">units</span>
            </h3>
            <p className="mt-1 text-xs text-slate-500">Standard batch production</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Target Due Date</span>
              <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {job.dueDate}
            </h3>
            <p className="mt-1 text-xs text-slate-500">Dispatch deadline</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Workstation / Machine</span>
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <Cpu className="h-4 w-4" />
              </div>
            </div>
            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {job.machine || "Unassigned"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">Shopfloor Station</p>
          </div>
        </div>

        {/* Main Content: Left Column (Specs + Notes) & Right Column (Status & Controls) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column (2 spans) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Technical Specifications */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Technical & Order Specifications
                    </h2>
                    <p className="text-xs text-slate-500">
                      Production engineering details and manufacturing requirements
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 block">Job Identification</span>
                  <span className="text-sm font-bold text-blue-600 font-mono mt-0.5 block">{job.id}</span>
                </div>

                <div className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 block">Product Component</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">{job.product}</span>
                </div>

                <div className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 block">Client Entity</span>
                  <span className="text-sm font-semibold text-slate-800 mt-0.5 block">{job.customer}</span>
                </div>

                <div className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 block">Assigned Work Center</span>
                  <span className="text-sm font-semibold text-slate-800 mt-0.5 block">{job.machine || "Pending Assignment"}</span>
                </div>

                <div className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 block">Order Volume</span>
                  <span className="text-sm font-semibold text-slate-800 font-mono mt-0.5 block">
                    {Number(job.quantity).toLocaleString()} Units
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 block">Inspection Standard</span>
                  <div className="flex items-center gap-1.5 mt-0.5 text-emerald-700 font-semibold text-sm">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>ISO 9001:2015 Tier-1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Special Instructions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Work Instructions & Floor Notes
                    </h2>
                    <p className="text-xs text-slate-500">
                      Operator notes, special instructions, and dispatch conditions
                    </p>
                  </div>
                </div>

                {!isEditingNotes && (
                  <button
                    type="button"
                    onClick={() => setIsEditingNotes(true)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Edit Notes
                  </button>
                )}
              </div>

              <div className="mt-4">
                {isEditingNotes ? (
                  <div className="space-y-3">
                    <label htmlFor={notesTextareaId} className="sr-only">
                      Edit Work Instructions & Notes
                    </label>
                    <textarea
                      id={notesTextareaId}
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      rows={4}
                      placeholder="Add instructions or shift notes for this job..."
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setNotesText(job.notes || "");
                          setIsEditingNotes(false);
                        }}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleNotesSave}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Notes</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {job.notes ? job.notes : "No special instructions or issues logged for this job."}
                    </p>
                  </div>
                )}

                {notesSaveSuccess && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 animate-fadeIn">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Notes updated successfully and saved to local storage!</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Status Control & Actions */}
          <div className="space-y-6">
            {/* Status Change Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Control Panel
                </span>
                <h2 className="text-base font-semibold text-slate-900 mt-0.5">
                  Update Production Status
                </h2>
                <p className="text-xs text-slate-500">
                  Select new status to reflect real-time floor progress
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="job-status-dropdown"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    Select Status
                  </label>
                  <div className="relative">
                    <select
                      id="job-status-dropdown"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-800 shadow-xs transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      {STATUS_OPTIONS.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Status indicator row */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Current Status:</span>
                    <StatusBadge status={job.status} />
                  </div>
                  {isStatusDirty && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-blue-700 font-medium">Selected:</span>
                      <span className="font-semibold text-slate-900">{selectedStatus}</span>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <button
                  type="button"
                  id="save-status-btn"
                  onClick={handleStatusSave}
                  disabled={!isStatusDirty}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <Check className="h-4 w-4" />
                  <span>{isStatusDirty ? "Save Status" : "Current Status"}</span>
                </button>

                {statusSaveSuccess && (
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Job status updated to <strong>{job.status}</strong>!</span>
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default JobDetailPage;
