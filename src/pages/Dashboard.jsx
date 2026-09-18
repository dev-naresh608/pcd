import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import JobFilters from "@/components/JobFilters";
import JobsTable from "@/components/JobsTable";
import JobDetailPanel from "@/components/JobDetailPanel";
import useJobs from "@/hooks/useJobs";

function Dashboard() {
  const {
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
  } = useJobs();

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

        <div className="flex flex-col gap-6 lg:flex-row items-start">
          <div className="flex-1 w-full min-w-0">
            <JobsTable
              jobs={filteredJobs}
              onRowClick={setSelectedJob}
              selectedJobId={selectedJob?.id}
            />
          </div>

          {selectedJob && (
            <div className="w-full lg:w-80 shrink-0">
              <JobDetailPanel
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export { Dashboard };
export default Dashboard;
