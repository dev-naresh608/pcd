import { User } from "lucide-react";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-sm">
                PC
              </div>
              <span className="text-base font-semibold text-slate-900">
                Production Control Dashboard
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-3 pr-1.5 shadow-xs">
                <span className="text-xs font-medium text-slate-700">
                  Demo User
                </span>
                <div
                  title="Demo User"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-600"
                >
                  <User className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export { DashboardLayout };
export default DashboardLayout;
