import { useNavigate, useLocation } from 'react-router-dom'
import Avatar from './Avatar'

/**
 * Кнопка профиля пользователя с аватаром
 * @param {Object} user - Объект пользователя
 * @param {Object} fullUser - Полный профиль пользователя
 */
export default function UserProfileButton({ user, fullUser }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isAccountPage = location.pathname === '/account'

  const firstName = fullUser?.firstName || user?.firstName || ''
  const lastName = fullUser?.lastName || user?.lastName || ''
  const avatar = fullUser?.avatar || user?.avatar || ''
  const username = user?.username || ''

  return (
    <button
      type='button'
      onClick={() => navigate('/account')}
      className={`flex items-center gap-2 md:gap-3 px-2 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer ${
        isAccountPage 
          ? 'bg-cyan-500/15 text-teal-700' 
          : 'hover:bg-cyan-500/8'
      }`}
    >
      <Avatar 
        firstName={firstName} 
        lastName={lastName} 
        avatar={avatar} 
        username={username} 
        size='w-8 h-8 md:w-9 md:h-9' 
      />
      <div className='hidden md:flex flex-col items-start'>
        {firstName ? (
          <>
            <span className={`text-base font-semibold leading-none ${isAccountPage ? 'text-teal-700' : 'text-gray-900'}`}>
              {firstName}
            </span>
            {lastName && (
              <span className={`text-sm leading-none mt-0.5 ${isAccountPage ? 'text-teal-600' : 'text-gray-600'}`}>
                {lastName}
              </span>
            )}
          </>
        ) : (
          <span className={`text-base font-semibold leading-none ${isAccountPage ? 'text-teal-700' : 'text-gray-900'}`}>
            {username}
          </span>
        )}
      </div>
      <div className='md:hidden font-semibold text-gray-900'>
        {firstName || username}
      </div>
    </button>
  )
}

