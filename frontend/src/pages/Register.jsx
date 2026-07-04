import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-cyan-950/30">
        <h2 className="text-3xl font-semibold">Create your account</h2>
        <p className="mt-2 text-sm text-slate-400">Join as a student or instructor and start building your learning path.</p>

        {error ? <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</div> : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <button disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Creating account...' : 'Create Account'}</button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-cyan-400">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
