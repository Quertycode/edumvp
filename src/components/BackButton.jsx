import { Link, useLocation } from 'react-router-dom'

export default function BackButton() {
  const location = useLocation()
  
  // Не показываем кнопку на главной странице и на странице логина
  if (location.pathname === '/' || location.pathname === '/login') {
    return null
  }

  return (
    <div className='hidden md:block fixed left-4 top-20 z-10'>
      <Link
        to='/'
        className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors'
      >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className='w-5 h-5'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
      </svg>
      <span className='text-sm'>На главную</span>
    </Link>
    </div>
  )
}

