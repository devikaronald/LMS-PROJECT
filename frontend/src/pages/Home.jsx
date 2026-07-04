import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),transparent_35%),linear-gradient(135deg,_#020617,_#111827)] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">Industry-ready LMS platform</p>
          <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">Learn faster with a modern, immersive teaching experience.</h1>
          <p className="mt-6 text-lg text-slate-300">Create, manage, and consume high-quality courses with secure authentication, video lessons, progress tracking, and polished dashboards.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950">Start Learning</Link>
            <Link to="/login" className="rounded-2xl border border-slate-700 px-6 py-3 font-semibold">Access Dashboard</Link>
          </div>
        </div>
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
          <div className="grid gap-4 sm:grid-cols-2">
            {['Secure JWT auth', 'Course search & enrollments', 'Instructor course management', 'Progress analytics'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
