import Navbar from "../../../components/shared/Navbar"

const DashboardPage = () => {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#2b2f3a_0%,#191b21_55%,#121317_100%)] px-4 py-12 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Navbar />
      </div>
    </div>
  )
}

export default DashboardPage