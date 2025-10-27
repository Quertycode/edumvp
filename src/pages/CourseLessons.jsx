import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'
import { getCurrentUser, getUserFull } from '../utils/userStore'
import coursesData from '../data/courses.json'

export default function CourseLessons() {
  const { subject } = useParams()
  const user = getCurrentUser()
  const fullUser = user ? getUserFull(user.username) : null
  const [filter, setFilter] = useState('active') // 'active' или 'all'
  const [progress, setProgress] = useState({})

  useEffect(() => {
    // Загружаем прогресс пользователя из localStorage
    const savedProgress = localStorage.getItem(`progress_${user?.username}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [user])

  if (!user) {
    return <Card title='Доступ запрещен'>Пожалуйста, войдите в систему.</Card>
  }

  if (user.role === 'guest') {
    return <Card title='Доступ запрещен'>Курсы недоступны для гостя.</Card>
  }

  if (!fullUser?.access?.[subject]?.enabled) {
    return <Card title='Доступ запрещен'>У вас нет доступа к этому курсу.</Card>
  }

  const course = coursesData[subject]
  if (!course) {
    return <Card title='Ошибка'>Курс не найден.</Card>
  }

  const getLessonProgress = (lessonId) => {
    const key = `${subject}_${lessonId}`
    return progress[key] || { watched: false, completed: false }
  }

  const updateProgress = (lessonId, type) => {
    const key = `${subject}_${lessonId}`
    const newProgress = {
      ...progress,
      [key]: {
        ...progress[key],
        [type]: true
      }
    }
    setProgress(newProgress)
    localStorage.setItem(`progress_${user.username}`, JSON.stringify(newProgress))
  }

  const filteredLessons = course.lessons.filter(lesson => {
    if (filter === 'all') return true
    const lessonProgress = getLessonProgress(lesson.id)
    return !lessonProgress.watched || !lessonProgress.completed
  })

  return (
    <div className='space-y-4'>
      <Card title={`${course.title} - Занятия`}>
        <div className='mb-4'>
          <div className='flex gap-2 mb-4'>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'active'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              В работе
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition ${
                filter === 'all'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Все занятия
            </button>
          </div>
        </div>

        <div className='space-y-3'>
          {filteredLessons.map(lesson => {
            const lessonProgress = getLessonProgress(lesson.id)
            const isCompleted = lessonProgress.watched && lessonProgress.completed
            
            return (
              <div
                key={lesson.id}
                className={`border rounded-xl p-4 transition ${
                  isCompleted
                    ? 'border-green-200 bg-green-50'
                    : 'border-cyan-200 bg-white'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-lg mb-2'>{lesson.title}</h3>
                    <div className='flex gap-4 text-sm text-gray-600'>
                      <span className={`flex items-center gap-1 ${
                        lessonProgress.watched ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          lessonProgress.watched ? 'bg-green-500' : 'bg-gray-300'
                        }`}></span>
                        Видео {lessonProgress.watched ? 'просмотрено' : 'не просмотрено'}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        lessonProgress.completed ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          lessonProgress.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></span>
                        ДЗ {lessonProgress.completed ? 'выполнено' : 'не выполнено'}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/courses/${subject}/${lesson.id}`}
                    className='px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition'
                  >
                    Открыть
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {filteredLessons.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            {filter === 'active' ? 'Все занятия завершены!' : 'Занятия не найдены.'}
          </div>
        )}
      </Card>
    </div>
  )
}