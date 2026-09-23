# Production Control Dashboard

> **Shop Floor Operations Mini Product** built for Factory Operations Managers to monitor real-time production orders, machine assignments, floor bottlenecks, and scheduled dispatches.

[![Live Demo](https://img.shields.io/badge/Demo-Live_on_Vercel-orange?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)

---

## 🎯 Project Overview & Context

This dashboard is purpose-built for an **Operations Manager** on a high-mix, precision manufacturing shop floor. Rather than looking like a generic marketing site or SaaS template, it reflects the daily workflow of a floor manager:
- Quickly triaging **delayed jobs** and production blockers.
- Tracking order quantities against delivery due dates.
- Monitoring machine workstation assignments (`CNC-01`, `Lathe-03`, `Press-04`, etc.).
- Updating order statuses and shift notes with real-time state persistence.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom **Industrial Safety Orange & Dark Slate** design token system.
- **Icons**: [lucide-react](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) (Dashboard + Dedicated Fullscreen Job View)
- **State & Storage**: React Context API (`JobsContext`) with automatic `localStorage` synchronization.

---

## ✨ Key Features & User Workflows

### 1. Summary KPIs Section
- **Total Work Orders**: Real-time counter of orders in the pipeline.
- **Delayed Jobs**: Urgent alert card with visual pulse for immediate triage. Clicking it instantly filters the table to delayed orders.
- **Due Today / Soon**: Highlights orders with immediate delivery deadlines (within 3 days).
- **Completed Jobs**: Dynamic completion rate meter (`% floor efficiency`).

### 2. Jobs / Work Orders Dispatch Table
- Displays all required columns:
  - **Job ID**: Monospace identifier with orange highlight.
  - **Product Name**: Detailed component description.
  - **Customer**: Verified client entity name.
  - **Quantity**: Formatted unit counts (`pcs`).
  - **Due Date**: Formatted date with relative urgency badges (`Overdue`, `Due Today`, `In 3d`).
  - **Status**: Visual status badge (`Pending`, `In Progress`, `Delayed`, `Completed`) with colored indicators.
  - **Assigned Machine**: Workstation tag (`CNC`, `Lathe`, `Press`, `Molding`).
- **Responsive table**: Supports horizontal scrolling and keyboard navigation.

### 3. Interactive Slide-Over Job Detail Panel (Drawer)
- Clicking any job row triggers a sleek right-side **Slide-Over Drawer** (with backdrop blur and `Esc` key shortcut).
- Displays full order specifications, customer information, and workstation telemetry.
- **5-Stage Floor Progress Tracker**: `Order Booked` ➔ `Material Staged` ➔ `Machining` ➔ `QA Check` ➔ `Ready for Dispatch`.
- **Floor Notes & Issues Log**: Live editable shift notes with persistence.
- **Instant Status Action**: Interactive status update control that immediately updates the dashboard, summary cards, and localStorage.
- Quick link to dedicated full-screen view (`/jobs/:id`).

### 4. Search, Filter & Multi-Criteria Sort
- **Search**: Instant case-insensitive search across Job ID, Product Name, Customer, and Machine.
- **Quick Status Tabs**: Filter by `All Orders`, `In Progress`, `Delayed`, `Pending`, or `Completed` with real-time count badges.
- **Sorting**:
  - Due Date: Earliest First / Latest First
  - Quantity: Highest First / Lowest First
- **One-Click Reset**: Resets all active filters.

### 5. Shop Floor Bonus Operations
- **Export to CSV**: Download filtered work orders as a spreadsheet.
- **New Work Order Modal**: Dispatch a new production run with custom product, customer, quantity, machine, and due date.
- **Reset Mock Data**: One-click restore button to reset data back to default factory state.

---

## 🏗 Component Structure

```
src/
├── components/
│   ├── CreateJobModal.jsx     # Dialog to dispatch new work orders
│   ├── DashboardHeader.jsx    # Floor telemetry, live date, CSV export & modal trigger
│   ├── JobDetailPanel.jsx     # Slide-over sheet with status updater & 5-stage progress
│   ├── JobFilters.jsx         # Status pill tabs, search bar & sort dropdown
│   ├── JobRow.jsx             # Individual table row with relative badges
│   ├── JobsTable.jsx          # Main data table with empty-state handling
│   ├── StatusBadge.jsx        # Status pills with color-coded pulsing dots
│   ├── SummaryCards.jsx       # 4 KPI cards with click-to-filter capability
│   └── index.js               # Clean component barrel exports
├── context/
│   ├── JobsContext.jsx        # State management (jobs, filters, CRUD, toast, localStorage)
│   ├── useJobsContext.js      # Custom consumer hook
│   └── index.js
├── data/
│   └── mockJobs.js            # 15 realistic precision manufacturing orders
├── layouts/
│   └── DashboardLayout.jsx    # Industrial navbar, Shift telemetry, Demo User profile, toast container
├── pages/
│   ├── Dashboard.jsx          # Primary operations control center
│   ├── JobDetailPage.jsx      # Dedicated full-page route (/jobs/:id)
│   └── index.js
├── App.jsx                    # Route configuration & JobsProvider wrapper
├── index.css                  # Typography tokens, scrollbars, and keyframe animations
└── main.jsx                   # React 19 root entry
```

---

## 💡 Assumptions Made

1. **Target User**: An on-floor Operations Manager who values high-contrast readability, rapid keyboard/mouse interactions, and zero clutter over marketing fluff.
2. **Color Palette**: An **Industrial Safety Orange (`#f97316` / `#ea580c`)** and **Dark Zinc/Slate** palette was chosen to evoke industrial machinery (e.g. Caterpillar/Fanuc CNC stations) while maintaining optimal contrast (WCAG AAA for text).
3. **Data Persistence**: Uses browser `localStorage` as a zero-latency mock database so that status updates and note edits persist across page refreshes during evaluation. A `Reset Data` button is provided in the header to return to the original 15 mock orders at any time.
4. **Slide-Over vs Full Page**: The client brief specifically requested a side panel/modal for rapid triage, so row clicks open a slide-over sheet directly on the dashboard. A full-page route (`/jobs/:id`) was also built to support bookmarking and deep links.

---

## 🚀 Future Improvements (With More Time)

1. **Drag-and-Drop Floor Scheduling**: A Kanban view or Gantt chart to reassign jobs across machines visually.
2. **Machine Utilization & Telemetry**: An interactive machine view showing current spindle load, temperature, and maintenance downtime schedules.
3. **Optimistic Backend & WebSockets**: Connect to a real Node.js / FastAPI backend with WebSocket feeds so multiple operators see status updates live on the shop floor.
4. **Barcode / QR Scanner Support**: Enable mobile camera scanning for operators to scan physical job route sheets directly into the dashboard.

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18+ installed

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd production-control-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## ☁️ Deployment Instructions (Vercel)

This project includes a pre-configured `vercel.json` for seamless client-side single page app routing:

1. Push your repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Vercel will automatically detect **Vite**; keep the default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your live dashboard will be ready in under 60 seconds!
