import { NavLink } from 'react-router-dom'
import { getCurrentUser } from '../../utils/userStore'

const linkBase =
  'text-gray-800 font-medium py-2 px-2 md:px-4 text-sm md:text-base whitespace-nowrap border-b-2 border-transparent hover:border-cyan-500 transition-all duration-200'

const activeLinkBase =
  'text-cyan-500 font-medium py-2 px-2 md:px-4 text-sm md:text-base whitespace-nowrap border-b-2 border-cyan-500 transition-all duration-200'

/**
 * Навигационное меню
 */
export default function Navigation() {
  const user = getCurrentUser()

  return (
    <nav className='w-full md:w-auto flex gap-1 md:gap-2 items-center md:items-start order-3 md:order-3 overflow-x-auto pb-2 md:pb-0'>
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
  )
}

