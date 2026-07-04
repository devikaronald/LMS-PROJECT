import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, LayoutDashboard, LogOut, Menu, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-800 bg-slate-900/80 p-5 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/20 p-3 text-cyan-400">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-lg font-semibold">LMS Pro</p>
              <p className="text-sm text-slate-400">Modern Learning Hub</p>
            </div>
          </div>

          <nav className="space-y-2">
            <NavLink className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-slate-800" to={user?.role === 'instructor' ? '/instructor-dashboard' : '/dashboard'}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-slate-800" to="/courses">
              <BookOpen size={18} /> Courses
            </NavLink>
            <NavLink className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-slate-800" to="/my-learning">
              <BookOpen size={18} /> My Learning
            </NavLink>
            <NavLink className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-slate-800" to="/profile">
              <UserCircle size={18} /> Profile
            </NavLink>
          </nav>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="font-medium">{user?.name || 'Student'}</p>
            <p className="text-sm uppercase text-cyan-400">{user?.role || 'student'}</p>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-slate-800 bg-slate-900/70 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-400">Learning Management System</p>
                <h1 className="text-xl font-semibold">{user?.role === 'instructor' ? 'Instructor Workspace' : 'Student Workspace'}</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-slate-700 p-2">
                  <Menu size={18} />
                </button>
                <button onClick={logout} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
