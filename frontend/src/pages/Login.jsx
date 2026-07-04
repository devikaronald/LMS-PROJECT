import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-cyan-950/30">
        <h2 className="text-3xl font-semibold">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-400">Sign in to continue your learning journey.</p>

        {error ? <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</div> : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
          <button className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Login</button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New here? <Link to="/register" className="text-cyan-400">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
