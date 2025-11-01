import Card from '../../../components/Card'
import { Link } from 'react-router-dom'

/**
 * Модуль "Предметы"
 * Отображает информацию о доступных курсах
 */
export default function CoursesModule() {
  return (
    <Card className='h-full flex flex-col'>
      <h2 className='text-xl md:text-2xl font-semibold text-cyan-800 mb-4'>Ваши курсы</h2>
      <p className='text-gray-600 mb-4 flex-1'>
        Изучайте материалы курсов, выполняйте задания и отслеживайте прогресс обучения
      </p>
      <div className='flex gap-3 flex-wrap mt-auto'>
        <Link
          to='/courses'
          className='px-4 md:px-5 py-2 md:py-3 rounded-xl border border-cyan-300 hover:bg-cyan-50 transition text-sm md:text-base whitespace-nowrap'
        >
          Открыть курсы
        </Link>
      </div>
    </Card>
  )
}

