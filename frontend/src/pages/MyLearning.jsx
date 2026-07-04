import { useEffect, useState } from 'react';
import api from '../services/api';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const response = await api.get('/enroll/my-courses');
      setCourses(response.data);
    };

    loadCourses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-2xl font-semibold">My learning</h2>
        <p className="mt-2 text-sm text-slate-400">Continue where you left off and keep your progress moving.</p>
      </div>

      <div className="space-y-4">
        {courses.map((enrollment) => (
          <div key={enrollment._id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{enrollment.courseId?.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{enrollment.courseId?.description}</p>
              </div>
              <div className="w-full md:max-w-xs">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                  <span>Progress</span>
                  <span>{enrollment.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${enrollment.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning;
