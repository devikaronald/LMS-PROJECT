import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="mt-6 space-y-4 text-slate-300">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-sm text-slate-400">Name</p>
          <p className="mt-1 text-lg font-medium">{user?.name}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-sm text-slate-400">Email</p>
          <p className="mt-1 text-lg font-medium">{user?.email}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-sm text-slate-400">Role</p>
          <p className="mt-1 text-lg font-medium uppercase">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
