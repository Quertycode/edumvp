import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { getCurrentUser, getUserFull } from '../utils/userStore'

const linkBase =
  'px-4 py-2 rounded-xl border border-cyan-300/70 bg-white/70 hover:bg-cyan-50 transition-all shadow-sm hover:shadow'
const activeLinkBase =
  'px-4 py-2 rounded-xl border border-cyan-500 bg-cyan-100 text-cyan-800 font-medium shadow-md'

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

export default function Header() {
  const user = getCurrentUser()
  const navigate = useNavigate()
  const location = useLocation()
  const fullUser = user ? getUserFull(user.username) : null
  const { firstName, lastName } = getDisplayName(user, fullUser)
  const isAccountPage = location.pathname === '/account'
  const avatar = fullUser?.avatar || user?.avatar || ''
  const username = user?.username || ''

  return (
    <header className='sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-cyan-100'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <button
                type='button'
                onClick={() => navigate('/account')}
                className={`flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer ${isAccountPage ? 'opacity-100' : 'opacity-90'}`}
              >
                <Avatar firstName={firstName} lastName={lastName} avatar={avatar} username={username} />
                <div className='flex flex-col items-start'>
                  {firstName ? (
                    <>
                      <span className='text-base font-semibold text-gray-900 leading-none'>
                        {firstName}
                      </span>
                      {lastName && <span className='text-sm text-gray-600 leading-none mt-0.5'>{lastName}</span>}
                    </>
                  ) : (
                    <span className='text-base font-semibold text-gray-900 leading-none'>{username}</span>
                  )}
                </div>
              </button>
              <button
                type='button'
                onClick={() => alert('Уведомления пока не реализованы')}
                className='p-2 -ml-4 transition-all cursor-pointer'
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4 text-cyan-600 hover:text-cyan-800 transition-colors'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' />
                </svg>
              </button>
              <div className='flex items-center gap-2 ml-4'>
                <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
                  <div className='h-full bg-cyan-500 rounded-full' style={{ width: '60%' }}></div>
                </div>
              </div>
            </>
          ) : (
            <Link to='/login' className='text-sm text-cyan-600 hover:bg-cyan-50 hover:text-cyan-800 font-medium px-3 py-1.5 rounded-lg border border-cyan-200 transition-all cursor-pointer'>
              Войти
            </Link>
          )}
        </div>

        <div className='flex items-center gap-4'>
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
            to='/knowledge-base'
            className={({ isActive }) => (isActive ? activeLinkBase : linkBase)}
          >
            База знаний
          </NavLink>
          <NavLink
            to='/tasks'
            className={({ isActive }) => (isActive ? activeLinkBase : linkBase)}
          >
            Банк заданий
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
      </div>
    </header>
  )
}
