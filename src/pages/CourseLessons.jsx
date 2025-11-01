import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { getCurrentUser, getUserFull } from '../utils/userStore'
import coursesData from '../data/courses.json'
import LessonCard from '../modules/course/components/LessonCard'
import LessonFilter from '../modules/course/components/LessonFilter'

/**
 * Страница уроков курса - композиция модульных компонентов
 * Рефакторинг: Разбита на LessonCard и LessonFilter
 */
export default function CourseLessons() {
  const { subject } = useParams()
  const navigate = useNavigate()
  const user = getCurrentUser()
  const fullUser = user ? getUserFull(user.username) : null
  const [filter, setFilter] = useState('active')
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${user?.username}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [user])

  if (!user) {
    return <Card title='Доступ запрещен'>Пожалуйста, войдите в систему.</Card>
  }

  if (user.role === 'guest') {
    return <Card title='Доступ запрещен'>Предметы недоступны для гостя.</Card>
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

  const filteredLessons = course.lessons.filter(lesson => {
    if (filter === 'all') return true
    const lessonProgress = getLessonProgress(lesson.id)
    return !lessonProgress.watched || !lessonProgress.completed
  })

  return (
    <div className='space-y-4'>
      <Card title={`${course.title} - Занятия`}>
        <div className='mb-4 flex justify-between items-center'>
          <LessonFilter filter={filter} onFilterChange={setFilter} />
          <button
            onClick={() => navigate(`/knowledge-base/${subject}`)}
            className='px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition'
          >
            Материалы по предмету
          </button>
        </div>

        <div className='space-y-3'>
          {filteredLessons.map(lesson => {
            const lessonProgress = getLessonProgress(lesson.id)
            
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                subject={subject}
                progress={lessonProgress}
              />
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