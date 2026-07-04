const LoadingSpinner = () => (
  <div className="flex min-h-[220px] items-center justify-center">
    <div className="flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      Loading...
    </div>
  </div>
);

export default LoadingSpinner;
