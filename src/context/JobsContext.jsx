import { createContext, useState, useEffect, useMemo } from "react";
import mockData from "@/data/mockJobs";

const STORAGE_KEY = "pcd_production_jobs_data";

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ! Ignore
    }
    return mockData;
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch {}
  }, [jobs]);

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
    setSortBy("dueDate");
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  };

  const updateJobNotes = (jobId, newNotes) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, notes: newNotes } : job,
      ),
    );
  };

  const resetJobsToDefault = () => {
    setJobs(mockData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ! Ignore
    }
  };

  const getJobById = (id) => {
    return jobs.find((job) => job.id.toLowerCase() === id?.toLowerCase());
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

  const value = {
    jobs,
    filteredJobs,
    search,
    setSearch,
    status,
    setStatus,
    sortBy,
    setSortBy,
    handleClearFilters,
    updateJobStatus,
    updateJobNotes,
    resetJobsToDefault,
    getJobById,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export { JobsContext };
export default JobsContext;
