const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">404</p>
        <h2 className="mt-3 text-4xl font-semibold">Page not found</h2>
        <p className="mt-3 text-slate-400">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
