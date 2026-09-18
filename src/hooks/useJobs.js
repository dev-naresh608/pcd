import { useState, useMemo } from "react";
import mockJobs from "@/data/mockJobs";

export function useJobs(initialJobs = mockJobs) {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");
  const [selectedJob, setSelectedJob] = useState(null);

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
    setSortBy("dueDate");
  };

  const handleUpdateStatus = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    setSelectedJob((prev) =>
      prev && prev.id === jobId ? { ...prev, status: newStatus } : prev
    );
  };

  const filteredJobs = useMemo(() => {
    const term = search.trim().toLowerCase();

    let result = jobs.filter((job) => {
      const matchesSearch =
        term === "" ||
        job.id.toLowerCase().includes(term) ||
        job.product.toLowerCase().includes(term) ||
        job.customer.toLowerCase().includes(term) ||
        job.status.toLowerCase().includes(term) ||
        (job.machine && job.machine.toLowerCase().includes(term));

      const matchesStatus = status === "All" || job.status === status;

      return matchesSearch && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "quantity") {
        return a.quantity - b.quantity;
      }
      return a.dueDate.localeCompare(b.dueDate);
    });

    return result;
  }, [jobs, search, status, sortBy]);

  return {
    jobs,
    filteredJobs,
    search,
    setSearch,
    status,
    setStatus,
    sortBy,
    setSortBy,
    selectedJob,
    setSelectedJob,
    handleClearFilters,
    handleUpdateStatus,
  };
}

export default useJobs;