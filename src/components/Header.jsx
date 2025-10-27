import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { getCurrentUser, getUserFull, getNotifications, getUnreadCount, markNotificationAsRead } from '../utils/userStore'

const linkBase =
  'text-gray-800 font-medium py-2 px-4 border-b-2 border-transparent hover:border-cyan-500 transition-all duration-200'
const activeLinkBase =
  'text-cyan-500 font-medium py-2 px-4 border-b-2 border-cyan-500 transition-all duration-200'

const getDisplayName = (user, fullUser) => {
  if (!user) return { firstName: '', lastName: '' }
  const first = fullUser?.firstName || user.firstName || ''
  const last = fullUser?.lastName || user.lastName || ''
  return { firstName: first, lastName: last }
}

const getAvatarInitials = (firstName, lastName, username = '') => {
  if (firstName && lastName) {
    const first = firstName.charAt(0).toUpperCase()
    const last = lastName.charAt(0).toUpperCase()
    return first + last
  }
  if (firstName) {
    return firstName.charAt(0).toUpperCase()
  }
  if (username) {
    return username.charAt(0).toUpperCase()
  }
  return '?'
}

const Avatar = ({ firstName, lastName, avatar, username, size = 'w-9 h-9' }) => {
  const initials = getAvatarInitials(firstName, lastName, username)
  
  if (avatar) {
    return <img src={avatar} alt={`${firstName} ${lastName}`} className={`${size} rounded-full object-cover`} />
  }
  
  return (
    <div className={`${size} rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold text-base`}>
      {initials}
    </div>
  )
}

const NotificationsDropdown = ({ isOpen, onClose, notifications = [], unreadCount = 0, username = '', onMarkAsRead }) => {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleNotificationClick = (notification) => {
    if (notification.unread && onMarkAsRead) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <div
      ref={dropdownRef}
      className='absolute right-0 translate-x-1.5 mt-2 w-80 bg-white border border-gray-100 shadow-lg rounded-xl overflow-visible z-50'
    >
      {/* Треугольный указатель */}
      <div className='absolute -top-1.5 right-4 w-3 h-3 bg-white border-l border-t border-gray-100 transform rotate-45'></div>
      
      <div className='bg-white rounded-xl overflow-hidden'>
        <div className='p-3 border-b border-gray-100 font-semibold text-gray-800 text-center'>
          Уведомления{unreadCount > 0 && <span className='ml-2 text-sm text-gray-500 font-normal'>({unreadCount})</span>}
        </div>
        <ul className='max-h-60 overflow-y-auto'>
          {notifications.length === 0 ? (
            <li className='px-4 py-8 text-center text-gray-400 text-sm'>
              Нет уведомлений
            </li>
          ) : (
            notifications.map((notification) => (
              <li
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-cyan-500/7 ${
                  notification.unread 
                    ? 'bg-cyan-500/5 border-l-[3px] border-cyan-500' 
                    : ''
                }`}
              >
                {notification.emoji} {notification.text}
              </li>
            ))
          )}
        </ul>
        {notifications.length > 0 && (
          <div className='p-3 text-center text-sm text-cyan-500/70 hover:text-cyan-600 cursor-pointer border-t border-gray-100 transition-colors duration-200'>
            Показать все
          </div>
        )}
      </div>
    </div>
  )
}

export default function Header() {
  const user = getCurrentUser()
  const navigate = useNavigate()
  const location = useLocation()
  const fullUser = user ? getUserFull(user.username) : null
  const { firstName, lastName } = getDisplayName(user, fullUser)
  const isAccountPage = location.pathname === '/account'
  const avatar = fullUser?.avatar || user?.avatar || ''
  const username = user?.username || ''
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  
  // Получаем реальные уведомления пользователя
  const notifications = user ? getNotifications(user.username) : []
  const unreadCount = user ? getUnreadCount(user.username) : 0
  
  // Обработчик для отметки уведомления как прочитанного
  const handleMarkAsRead = (notificationId) => {
    if (user) {
      markNotificationAsRead(user.username, notificationId)
      // Обновляем состояние чтобы отобразились изменения
      window.location.reload()
    }
  }

  return (
    <header className='sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-cyan-100 h-16'>
      <div className='w-full px-6 h-full flex items-center justify-between relative'>
        {user ? (
          <>
            <div className='flex items-center gap-4'>
              <button
                type='button'
                onClick={() => navigate('/account')}
                className={`flex items-center gap-3 px-2.5 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                  isAccountPage 
                    ? 'bg-cyan-500/15 text-teal-700' 
                    : 'hover:bg-cyan-500/8'
                }`}
              >
                <Avatar firstName={firstName} lastName={lastName} avatar={avatar} username={username} />
                <div className='flex flex-col items-start'>
                  {firstName ? (
                    <>
                      <span className={`text-base font-semibold leading-none ${isAccountPage ? 'text-teal-700' : 'text-gray-900'}`}>
                        {firstName}
                      </span>
                      {lastName && <span className={`text-sm leading-none mt-0.5 ${isAccountPage ? 'text-teal-600' : 'text-gray-600'}`}>{lastName}</span>}
                    </>
                  ) : (
                    <span className={`text-base font-semibold leading-none ${isAccountPage ? 'text-teal-700' : 'text-gray-900'}`}>{username}</span>
                  )}
                </div>
              </button>
              <div className='relative'>
                <button
                  type='button'
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className='p-2 -ml-4 transition-all cursor-pointer'
                >
                  <div className='relative'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4 text-cyan-600 hover:text-cyan-800 transition-colors'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' />
                    </svg>
                    {/* Индикатор непрочитанных уведомлений - показывается только если есть непрочитанные */}
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
                  username={username}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
              <div className='flex items-center gap-2 ml-4'>
                <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
                  <div className='h-full bg-cyan-500 rounded-full' style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <div className='absolute left-1/2 -translate-x-1/2'>
              <Link to='/' className='font-bold text-2xl text-orange-500 hover:text-orange-600 transition-all cursor-pointer'>
                Эврика!
              </Link>
            </div>

            <nav className='flex gap-2 items-center'>
              <NavLink
                to='/courses'
                className={({ isActive }) => (isActive ? activeLinkBase : linkBase)}
              >
                Курсы
              </NavLink>
              <NavLink
                to='/tasks'
                className={({ isActive }) => (isActive ? activeLinkBase : linkBase)}
              >
                Банк заданий
              </NavLink>
              <NavLink
                to='/knowledge-base'
                className={({ isActive }) => (isActive ? activeLinkBase : linkBase)}
              >
                База знаний
              </NavLink>
              {user?.role === 'admin' && (
                <NavLink
                  to='/admin'
                  className={({ isActive }) => (isActive ? activeLinkBase : linkBase)}
                >
                  Админ
                </NavLink>
              )}
            </nav>
          </>
        ) : (
          <div className='w-full flex justify-center'>
            <Link to='/' className='font-bold text-2xl text-orange-500 hover:text-orange-600 transition-all cursor-pointer'>
              Эврика!
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
