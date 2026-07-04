import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data.course);
      setLessons(response.data.lessons || []);
      setIsEnrolled(response.data.isEnrolled);
    };

    loadCourse();
  }, [id]);

  const handleEnroll = async () => {
    await api.post('/enroll', { courseId: id });
    setIsEnrolled(true);
  };

  if (!course) return <div className="text-slate-300">Loading course...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">{course.category}</p>
        <h2 className="mt-2 text-3xl font-semibold">{course.title}</h2>
        <p className="mt-4 max-w-3xl text-slate-400">{course.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">${course.price}</span>
          <button onClick={handleEnroll} disabled={isEnrolled} className="rounded-2xl bg-cyan-500 px-5 py-2 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
            {isEnrolled ? 'Enrolled' : 'Enroll Now'}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h3 className="text-xl font-semibold">Course Lessons</h3>
        <div className="mt-4 space-y-3">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="font-medium">{lesson.title}</p>
              <p className="mt-1 text-sm text-slate-400">{lesson.description}</p>
              <p className="mt-2 text-sm text-cyan-400">Duration: {lesson.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
