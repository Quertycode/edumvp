import { Link } from 'react-router-dom'
import Card from '../../../components/Card'

/**
 * Заголовок урока с навигацией
 * @param {Object} lesson - Объект урока
 * @param {string} subject - Предмет
 * @param {Object} children - Дочерние компоненты (табы)
 */
export default function LessonHeader({ lesson, subject, children }) {
  return (
    <Card title={lesson.title}>
      <div className='mb-4'>
        <Link 
          to={`/courses/${subject}`}
          className='text-cyan-600 hover:text-cyan-800 text-sm'
        >
          ← Назад к занятиям
        </Link>
      </div>
      {children}
    </Card>
  )
}

