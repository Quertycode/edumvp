import { Link } from 'react-router-dom'

/**
 * Карточка урока
 * @param {Object} lesson - Объект урока
 * @param {string} subject - Предмет
 * @param {Object} progress - Прогресс урока
 */
export default function LessonCard({ lesson, subject, progress }) {
  const isCompleted = progress.watched && progress.completed

  return (
    <div
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
              progress.watched ? 'text-green-600' : 'text-gray-500'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                progress.watched ? 'bg-green-500' : 'bg-gray-300'
              }`}></span>
              Видео {progress.watched ? 'просмотрено' : 'не просмотрено'}
            </span>
            <span className={`flex items-center gap-1 ${
              progress.completed ? 'text-green-600' : 'text-gray-500'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                progress.completed ? 'bg-green-500' : 'bg-gray-300'
              }`}></span>
              ДЗ {progress.completed ? 'выполнено' : 'не выполнено'}
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
}

