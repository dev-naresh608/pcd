import { useContext } from "react";
import JobsContext from "./JobsContext";

export function useJobsContext() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobsContext must be used within a JobsProvider");
  }
  return context;
}

export default useJobsContext;
