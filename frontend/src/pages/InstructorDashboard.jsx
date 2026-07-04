import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const InstructorDashboard = () => {
  const [form, setForm] = useState({ title: '', description: '', category: '', price: 0, thumbnail: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/courses', form);
      toast.success('Course created successfully');
      setForm({ title: '', description: '', category: '', price: 0, thumbnail: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-2xl font-semibold">Instructor dashboard</h2>
        <p className="mt-2 text-sm text-slate-400">Create polished courses, manage lessons, and keep learners engaged.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Courses Published', value: '12+' },
          { label: 'Active Learners', value: '84' },
          { label: 'Completion Rate', value: '92%' },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h3 className="text-xl font-semibold">Create a course</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Course title" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Course description" className="min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
            <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="Thumbnail URL" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" />
            <button disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Publishing...' : 'Publish Course'}</button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h3 className="text-xl font-semibold">What instructors can do</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>• Manage course thumbnails and metadata</li>
            <li>• Upload lesson videos to your course</li>
            <li>• Track learner progress and completions</li>
            <li>• View enrollments from your dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
