import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const response = await api.get(`/courses?search=${search}`);
      setCourses(response.data);
      setLoading(false);
    };

    loadCourses();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-cyan-400">Discover your next skill</p>
          <h2 className="text-2xl font-semibold">Browse courses</h2>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, category, or topic" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 md:max-w-md" />
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
          <div key={course._id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
            <img src={course.thumbnail} alt={course.title} className="h-40 w-full object-cover" />
            <div className="p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">{course.category}</p>
              <h3 className="mt-2 text-xl font-semibold">{course.title}</h3>
              <p className="mt-3 text-sm text-slate-400">{course.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-300">${course.price}</span>
                <Link to={`/courses/${course._id}`} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">View Details</Link>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
