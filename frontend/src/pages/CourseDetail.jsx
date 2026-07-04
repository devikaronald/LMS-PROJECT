import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingLesson, setUpdatingLesson] = useState('');

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data.course);
      setLessons(response.data.lessons || []);
      setIsEnrolled(response.data.isEnrolled);
      setLoading(false);
    };

    loadCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await api.post('/enroll', { courseId: id });
      setIsEnrolled(true);
      toast.success('You are now enrolled in this course');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to enroll right now');
    }
  };

  const handleLessonProgress = async (lessonId, completed) => {
    try {
      setUpdatingLesson(lessonId);
      await api.put('/enroll/progress', { courseId: id, lessonId, completed });
      toast.success(completed ? 'Lesson marked complete' : 'Lesson marked incomplete');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update lesson progress');
    } finally {
      setUpdatingLesson('');
    }
  };

  if (loading) return <LoadingSpinner />;
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{lesson.description}</p>
                  <p className="mt-2 text-sm text-cyan-400">Duration: {lesson.duration}</p>
                </div>
                {isEnrolled ? (
                  <button disabled={updatingLesson === lesson._id} onClick={() => handleLessonProgress(lesson._id, true)} className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
                    {updatingLesson === lesson._id ? 'Updating...' : 'Mark complete'}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
