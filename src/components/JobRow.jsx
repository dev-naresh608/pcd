import StatusBadge from "@/components/StatusBadge";

function JobRow({ job, onRowClick, isSelected }) {
  return (
    <tr
      onClick={() => onRowClick?.(job)}
      className={`cursor-pointer transition-colors ${
        isSelected ? "bg-blue-50/70" : "hover:bg-slate-50"
      }`}
    >
      <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{job.id}</td>
      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{job.product}</td>
      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{job.customer}</td>
      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{job.quantity}</td>
      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{job.dueDate}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <StatusBadge status={job.status} />
      </td>
      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{job.machine}</td>
    </tr>
  );
}

export { JobRow };
export default JobRow;