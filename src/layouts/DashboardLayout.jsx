import { User, Factory, RotateCcw, CheckCircle } from "lucide-react";
import { useJobsContext } from "@/context";

function DashboardLayout({ children }) {
  const { resetJobsToDefault, toast, setToast } = useJobsContext();

  return (
    <div className="min-h-screen bg-zinc-50/80 text-zinc-900 antialiased selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Top Brand Stripe */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 w-full" />

      {/* Main Navbar */}
      <nav className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Industrial Logo & System Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/20">
                <Factory className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
                  Production Control Dashboard
                </span>
                <span className="text-xs text-zinc-500 hidden sm:inline">
                  Operations Management
                </span>
              </div>
            </div>

            {/* Right: Actions & User Profile */}
            <div className="flex items-center gap-3">
              {/* Reset Data Button */}
              <button
                type="button"
                onClick={resetJobsToDefault}
                title="Reset data to initial state"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
                <span>Reset Data</span>
              </button>

              <div className="h-6 w-px bg-zinc-200 hidden sm:block" />

              {/* User Profile Component */}
              <div className="flex items-center gap-2.5 rounded-xl border border-zinc-200/80 bg-white py-1.5 pl-3 pr-2 shadow-xs hover:border-orange-200 transition-all select-none">
                <span className="text-xs font-semibold text-zinc-800">
                  Demo User
                </span>
                <div
                  title="Demo User"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700 ring-1 ring-orange-200/70"
                >
                  <User className="h-4 w-4 stroke-[2.2]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 w-full">
        {children}
      </main>

      {/* Professional Clean Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-4 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
            <span className="font-semibold text-zinc-700">Production Control Dashboard</span>
          </div>
          <div className="text-zinc-400 text-[11px]">
            &copy; {new Date().getFullYear()} Factory Operations System. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-zinc-900 text-white px-4 py-3 shadow-xl animate-slide-in-right">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
            <CheckCircle className="h-3.5 w-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-medium text-zinc-100">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-zinc-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export { DashboardLayout };
export default DashboardLayout;
