import { User } from "lucide-react";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-sm shadow-xs">
                PC
              </div>
              <div>
                <span className="text-base font-semibold text-slate-900">
                  Production Control Dashboard
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="User Profile"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-3 pr-1.5 shadow-xs transition-all duration-150 ease-out hover:border-slate-300 hover:bg-slate-50 cursor-pointer active:scale-95 select-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <span className="text-xs font-medium text-slate-700">
                  Demo User
                </span>
                <div
                  title="Demo User"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600"
                >
                  <User className="h-3.5 w-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export { DashboardLayout };
export default DashboardLayout;
