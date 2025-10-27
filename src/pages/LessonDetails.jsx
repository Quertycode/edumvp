import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'
import { getCurrentUser, getUserFull } from '../utils/userStore'
import coursesData from '../data/courses.json'
import tasksData from '../data/tasks.json'

export default function LessonDetails() {
  const { subject, lessonId } = useParams()
  const user = getCurrentUser()
  const fullUser = user ? getUserFull(user.username) : null
  const [activeTab, setActiveTab] = useState('video')
  const [progress, setProgress] = useState({})
  const [homeworkAnswers, setHomeworkAnswers] = useState({})

  useEffect(() => {
    // Загружаем прогресс пользователя
    const savedProgress = localStorage.getItem(`progress_${user?.username}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }

    // Загружаем ответы на домашние задания
    const savedAnswers = localStorage.getItem(`homework_${user?.username}`)
    if (savedAnswers) {
      setHomeworkAnswers(JSON.parse(savedAnswers))
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

  const lesson = course.lessons.find(l => l.id === parseInt(lessonId))
  if (!lesson) {
    return <Card title='Ошибка'>Занятие не найдено.</Card>
  }

  const homeworkTasks = tasksData.filter(task => 
    lesson.homework.includes(task.id) && task.subject === subject
  )

  const markAsWatched = () => {
    const key = `${subject}_${lessonId}`
    const newProgress = {
      ...progress,
      [key]: {
        ...progress[key],
        watched: true
      }
    }
    setProgress(newProgress)
    localStorage.setItem(`progress_${user.username}`, JSON.stringify(newProgress))
  }

  const handleHomeworkSubmit = (taskId, answer) => {
    const key = `${subject}_${lessonId}_${taskId}`
    const newAnswers = {
      ...homeworkAnswers,
      [key]: answer
    }
    setHomeworkAnswers(newAnswers)
    localStorage.setItem(`homework_${user.username}`, JSON.stringify(newAnswers))

    // Проверяем, все ли задания выполнены
    const allCompleted = homeworkTasks.every(task => {
      const answerKey = `${subject}_${lessonId}_${task.id}`
      return newAnswers[answerKey]
    })

    if (allCompleted) {
      const progressKey = `${subject}_${lessonId}`
      const newProgress = {
        ...progress,
        [progressKey]: {
          ...progress[progressKey],
          completed: true
        }
      }
      setProgress(newProgress)
      localStorage.setItem(`progress_${user.username}`, JSON.stringify(newProgress))
    }
  }

  const getTaskAnswer = (taskId) => {
    const key = `${subject}_${lessonId}_${taskId}`
    return homeworkAnswers[key] || ''
  }

  const isTaskCorrect = (task, answer) => {
    if (!answer) return false
    return task.answer.some(correctAnswer => 
      correctAnswer.toLowerCase().trim() === answer.toLowerCase().trim()
    )
  }

  const tabs = [
    { id: 'video', label: 'Видео' },
    { id: 'homework', label: 'Домашняя работа' },
    { id: 'materials', label: 'Материалы' }
  ]

  return (
    <div className='space-y-4'>
      <Card title={lesson.title}>
        <div className='mb-4'>
          <Link 
            to={`/courses/${subject}`}
            className='text-cyan-600 hover:text-cyan-800 text-sm'
          >
            ← Назад к занятиям
          </Link>
        </div>

        {/* Табы */}
        <div className='flex gap-2 mb-6'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Контент табов */}
        {activeTab === 'video' && (
          <div className='space-y-4'>
            <div className='aspect-video bg-gray-100 rounded-xl overflow-hidden'>
              <iframe
                src={lesson.video}
                className='w-full h-full'
                allowFullScreen
                title={lesson.title}
              />
            </div>
            <button
              onClick={markAsWatched}
              className='px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition'
            >
              Отметить как просмотренное
            </button>
          </div>
        )}

        {activeTab === 'homework' && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Домашнее задание</h3>
            {homeworkTasks.map(task => {
              const answer = getTaskAnswer(task.id)
              const isCorrect = isTaskCorrect(task, answer)
              
              return (
                <div key={task.id} className='border rounded-xl p-4 bg-white'>
                  <p className='font-medium mb-3'>{task.question}</p>
                  <div className='space-y-2'>
                    <input
                      type={task.type === 'numeric' ? 'number' : 'text'}
                      value={answer}
                      onChange={(e) => handleHomeworkSubmit(task.id, e.target.value)}
                      placeholder='Введите ответ...'
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                    {answer && (
                      <div className={`text-sm ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isCorrect ? '✓ Правильно!' : '✗ Неправильно'}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'materials' && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Материалы к занятию</h3>
            {lesson.materials.map((material, index) => (
              <div key={index} className='border rounded-xl p-4 bg-white'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Материал {index + 1}</p>
                    <p className='text-sm text-gray-600'>{material}</p>
                  </div>
                  <a
                    href={material}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition'
                  >
                    Скачать
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}