import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [allCourses, enrolledCourses] = await Promise.all([
        api.get('/courses'),
        api.get('/enroll/my-courses'),
      ]);

      setCourses(allCourses.data.slice(0, 4));
      setMyCourses(enrolledCourses.data.slice(0, 4));
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Active Courses', value: myCourses.length },
          { label: 'Available Courses', value: courses.length },
          { label: 'Learning Goal', value: 'Master Skills' },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Recommended Courses</h3>
          <Link to="/courses" className="text-sm text-cyan-400">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div key={course._id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <h4 className="font-semibold">{course.title}</h4>
              <p className="mt-2 text-sm text-slate-400">{course.description}</p>
              <Link to={`/courses/${course._id}`} className="mt-4 inline-flex text-sm text-cyan-400">Open course</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">My Learning</h3>
          <Link to="/my-learning" className="text-sm text-cyan-400">Open</Link>
        </div>
        <div className="space-y-3">
          {myCourses.map((enrollment) => (
            <div key={enrollment._id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <div>
                <p className="font-medium">{enrollment.courseId?.title}</p>
                <p className="text-sm text-slate-400">Progress: {enrollment.progress}%</p>
              </div>
              <div className="h-2 w-24 rounded-full bg-slate-800">
                <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${enrollment.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
