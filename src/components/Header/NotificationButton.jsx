import { useState } from 'react'
import NotificationsDropdown from './NotificationsDropdown'

/**
 * Кнопка уведомлений с счетчиком и dropdown
 * @param {number} unreadCount - Количество непрочитанных уведомлений
 * @param {Array} notifications - Массив уведомлений
 * @param {function} onMarkAsRead - Функция отметки как прочитанного
 */
export default function NotificationButton({ unreadCount = 0, notifications = [], onMarkAsRead }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setNotificationsOpen(!notificationsOpen)}
        className='p-2 transition-all cursor-pointer'
      >
        <div className='relative'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5 text-cyan-600 hover:text-cyan-800 transition-colors'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' />
          </svg>
          {unreadCount > 0 && (
            <span className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-500 rounded-full'></span>
          )}
        </div>
      </button>
      <NotificationsDropdown 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={onMarkAsRead}
      />
    </div>
  )
}

