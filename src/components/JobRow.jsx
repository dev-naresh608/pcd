import { ArrowUpRight, Cpu, Building2, AlertCircle } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

function getDueDateBadge(dueDate, status) {
  if (status === "Completed") return null;

  const todayStr = new Date().toISOString().slice(0, 10);
  const due = new Date(dueDate);
  const today = new Date(todayStr);
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
        <AlertCircle className="h-2.5 w-2.5" />
        Overdue
      </span>
    );
  }
  if (diffDays === 0) {
    return (
      <span className="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
        Due Today
      </span>
    );
  }
  if (diffDays <= 3) {
    return (
      <span className="inline-flex items-center text-[10px] font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
        In {diffDays}d
      </span>
    );
  }
  return null;
}

function JobRow({ job, onRowClick, isSelected }) {
  const dueBadge = getDueDateBadge(job.dueDate, job.status);

  return (
    <tr
      onClick={() => onRowClick && onRowClick(job)}
      className={`group cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-orange-50/70 border-l-4 border-l-orange-500"
          : "bg-white hover:bg-orange-50/30"
      }`}
    >
      {/* Job ID */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-orange-600 group-hover:text-orange-700 group-hover:underline">
          {job.id}
        </span>
      </td>

      {/* Product Name */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="font-semibold text-zinc-900 text-sm group-hover:text-orange-950 transition-colors">
          {job.product}
        </div>
        {job.notes && (
          <div className="text-[11px] text-zinc-400 truncate max-w-xs">
            {job.notes}
          </div>
        )}
      </td>

      {/* Customer */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-zinc-700 text-xs font-medium">
          <Building2 className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          <span>{job.customer}</span>
        </div>
      </td>

      {/* Quantity */}
      <td className="px-5 py-3.5 whitespace-nowrap font-mono text-xs text-zinc-800">
        <div className="font-bold text-sm">
          {Number(job.quantity).toLocaleString()}
          <span className="text-[10px] font-normal text-zinc-500 ml-1">pcs</span>
        </div>
      </td>

      {/* Due Date */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-zinc-700 font-mono">
            {job.dueDate}
          </span>
          {dueBadge}
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <StatusBadge status={job.status} />
      </td>

      {/* Assigned Machine */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        {job.machine ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-mono font-medium text-zinc-700">
            <Cpu className="h-3 w-3 text-orange-500" />
            <span>{job.machine}</span>
          </span>
        ) : (
          <span className="text-zinc-400 text-xs italic">Unassigned</span>
        )}
      </td>

      {/* Action / Inspect */}
      <td className="px-5 py-3.5 whitespace-nowrap text-right text-xs font-semibold">
        <span className="inline-flex items-center gap-1 text-zinc-400 group-hover:text-orange-600 transition-colors">
          <span>Details</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </td>
    </tr>
  );
}

export { JobRow };
export default JobRow;