import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCurrentUser, getUserFull } from '../utils/userStore'
import coursesData from '../data/courses.json'
import tasksData from '../data/tasks.json'
import Card from '../components/Card'
import { useLessonProgress } from '../modules/lesson/hooks/useLessonProgress'
import LessonHeader from '../modules/lesson/components/LessonHeader'
import LessonTabs from '../modules/lesson/components/LessonTabs'
import VideoTab from '../modules/lesson/components/VideoTab'
import HomeworkTab from '../modules/lesson/components/HomeworkTab'
import MaterialsTab from '../modules/lesson/components/MaterialsTab'

/**
 * Страница деталей урока - композиция модульных компонентов
 * Рефакторинг: Разбит на модульные компоненты
 */
export default function LessonDetails() {
  const { subject, lessonId } = useParams()
  const user = getCurrentUser()
  const fullUser = user ? getUserFull(user.username) : null
  const [activeTab, setActiveTab] = useState('video')
  
  const { markAsWatched, handleHomeworkSubmit, getTaskAnswer } = useLessonProgress(subject, lessonId)

  // Проверка доступа
  if (!user) {
    return <Card title='Доступ запрещен'>Пожалуйста, войдите в систему.</Card>
  }

  if (user.role === 'guest') {
    return <Card title='Доступ запрещен'>Курсы недоступны для гостя.</Card>
  }

  if (!fullUser?.access?.[subject]?.enabled) {
    return <Card title='Доступ запрещен'>У вас нет доступа к этому курсу.</Card>
  }

  // Получение данных
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

  return (
    <div className='space-y-4'>
      <LessonHeader lesson={lesson} subject={subject}>
        <LessonTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'video' && (
          <VideoTab lesson={lesson} onMarkAsWatched={markAsWatched} />
        )}

        {activeTab === 'homework' && (
          <HomeworkTab 
            tasks={homeworkTasks}
            getTaskAnswer={getTaskAnswer}
            handleSubmit={handleHomeworkSubmit}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsTab materials={lesson.materials} />
        )}
      </LessonHeader>
    </div>
  )
}