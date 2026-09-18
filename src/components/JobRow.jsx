import StatusBadge from "@/components/StatusBadge";

function JobRow({ job, onRowClick, isSelected }) {
  return (
    <tr
      onClick={() => onRowClick?.(job)}
      className={`cursor-pointer transition-colors duration-150 ${
        isSelected
          ? "bg-blue-50/70"
          : "bg-white hover:bg-slate-50/80"
      }`}
    >
      <td className="px-5 py-3.5 font-semibold text-blue-600 whitespace-nowrap">
        {job.id}
      </td>
      <td className="px-5 py-3.5 font-medium text-slate-800 whitespace-nowrap">
        {job.product}
      </td>
      <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
        {job.customer}
      </td>
      <td className="px-5 py-3.5 text-slate-700 whitespace-nowrap font-mono text-xs">
        {Number(job.quantity).toLocaleString()}
      </td>
      <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap text-xs">
        {job.dueDate}
      </td>
      <td className="px-5 py-3.5 whitespace-nowrap">
        <StatusBadge status={job.status} />
      </td>
      <td className="px-5 py-3.5 whitespace-nowrap">
        {job.machine ? (
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            {job.machine}
          </span>
        ) : (
          <span className="text-slate-400 text-xs">—</span>
        )}
      </td>
    </tr>
  );
}

export { JobRow };
export default JobRow;