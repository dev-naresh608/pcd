import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import JobFilters from "@/components/JobFilters";
import JobsTable from "@/components/JobsTable";
import { useJobsContext } from "@/context";

function Dashboard() {
  const navigate = useNavigate();
  const {
    jobs,
    filteredJobs,
    search,
    setSearch,
    status,
    setStatus,
    sortBy,
    setSortBy,
    handleClearFilters,
  } = useJobsContext();

  const handleRowClick = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader />

        <SummaryCards jobs={jobs} />

        <JobFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onClearFilters={handleClearFilters}
        />

        <div className="w-full">
          <JobsTable
            jobs={filteredJobs}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export { Dashboard };
export default Dashboard;

