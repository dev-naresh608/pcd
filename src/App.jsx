import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, JobDetailPage } from "@/pages";
import { JobsProvider } from "@/context/JobsContext";

function App() {
  return (
    <JobsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </JobsProvider>
  );
}

export default App;