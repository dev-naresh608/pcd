import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

function JobRow({ job, onRowClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onRowClick) {
      onRowClick(job);
    } else {
      navigate(`/jobs/${job.id}`);
    }
  };

  return (
    <tr
      onClick={handleClick}
      className="group cursor-pointer transition-colors duration-150 bg-white hover:bg-blue-50/40"
    >
      <td className="px-5 py-3.5 whitespace-nowrap">
        <span className="font-semibold text-blue-600 group-hover:text-blue-700 font-mono transition-colors">
          {job.id}
        </span>
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
      <td className="px-5 py-3.5 whitespace-nowrap text-right text-xs font-medium">
        <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-blue-600 transition-colors">
          <span>View</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </td>
    </tr>
  );
}

export { JobRow };
export default JobRow;