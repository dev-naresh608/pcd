import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import JobFilters from "@/components/JobFilters";
import JobsTable from "@/components/JobsTable";
import JobDetailPanel from "@/components/JobDetailPanel";
import CreateJobModal from "@/components/CreateJobModal";
import { useJobsContext } from "@/context";

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
    handleClearFilters,
    updateJobStatus,
    updateJobNotes,
    getJobById,
  } = useJobsContext();

  // Selected job for slide-over side panel
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Keep selected job updated from context
  const activeJob = selectedJobId ? getJobById(selectedJobId) : null;

  const handleRowClick = (job) => {
    setSelectedJobId(job.id);
  };

  const handleClosePanel = () => {
    setSelectedJobId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Telemetry & Actions */}
        <DashboardHeader onOpenCreateModal={() => setIsCreateModalOpen(true)} />

        {/* 4 Summary KPI Cards */}
        <SummaryCards jobs={jobs} />

        {/* Filters, Status Tabs, and Search Bar */}
        <JobFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onClearFilters={handleClearFilters}
          jobs={jobs}
        />

        {/* Main Work Orders Table */}
        <div className="w-full">
          <JobsTable
            jobs={filteredJobs}
            onRowClick={handleRowClick}
            selectedJobId={selectedJobId}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Slide-Over Job Detail Panel (Sheet / Right Drawer) */}
        {activeJob && (
          <JobDetailPanel
            key={activeJob.id}
            job={activeJob}
            onClose={handleClosePanel}
            onUpdateStatus={updateJobStatus}
            onUpdateNotes={updateJobNotes}
          />
        )}

        {/* Modal for creating a new work order */}
        <CreateJobModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}

export { Dashboard };
export default Dashboard;
