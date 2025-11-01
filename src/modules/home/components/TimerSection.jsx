import { Link } from 'react-router-dom'

/**
 * Компонент для отображения таймера и ссылки на расписание
 * @param {string} timeLeft - Текст с оставшимся временем
 */
export default function TimerSection({ timeLeft }) {
  return (
    <div className='flex items-center justify-between gap-3'>
      {/* Таймер */}
      <div className='flex items-center gap-2 py-1 text-[11px] text-gray-600'>
        <svg className='w-3 h-3 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
        <span className='whitespace-nowrap'>{timeLeft || 'Загрузка...'}</span>
      </div>
      
      {/* Ссылка на расписание */}
      <Link
        to='/schedule'
        className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-[11px] text-gray-600 hover:bg-cyan-50 hover:text-cyan-600 transition whitespace-nowrap'
      >
        <svg className='w-3 h-3 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
        </svg>
        <span>Расписание</span>
        <svg className='w-3 h-3 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24' style={{ transform: 'rotate(-90deg)' }}>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
        </svg>
      </Link>
    </div>
  )
}
