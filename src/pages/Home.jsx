import Card from '../components/Card'
import { Link } from 'react-router-dom'
import { getCurrentUser, getUserFull } from '../utils/userStore'
import { useState, useEffect } from 'react'

const getGreetingName = (user, fullUser) => {
  if (!user) return ''
  const fullName = [fullUser?.firstName || user.firstName, fullUser?.lastName || user.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()
  return fullName || fullUser?.email || user.email || user.username
}

const getDeclension = (number, one, two, five) => {
  const n = number % 100
  const n1 = number % 10
  if (n > 10 && n < 20) return five
  if (n1 > 1 && n1 < 5) return two
  if (n1 === 1) return one
  return five
}

export default function Home() {
  const user = getCurrentUser()
  const fullUser = user ? getUserFull(user.username) : null
  const name = getGreetingName(user, fullUser)
  
  const [timeLeft, setTimeLeft] = useState('')
  
  useEffect(() => {
    const targetDate = new Date('2025-11-06T00:00:00').getTime()
    
    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        
        const daysWord = getDeclension(days, 'день', 'дня', 'дней')
        const hoursWord = getDeclension(hours, 'час', 'часа', 'часов')
        const minutesWord = getDeclension(minutes, 'минута', 'минуты', 'минут')
        
        setTimeLeft(`${days} ${daysWord}, ${hours} ${hoursWord} и ${minutes} ${minutesWord} до начала`)
      } else {
        setTimeLeft('Вебинар уже начался')
      }
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Обновляем каждую минуту
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='h-full flex flex-col min-h-0 p-4 md:p-6'>
      {/* Three Module Boxes */}
      <div className='grid grid-cols-1 lg:grid-cols-[30fr_40fr_30fr] gap-4 flex-1 min-h-0'>
        {/* Module 1 - Ближайший вебинар */}
        <Card className='h-full flex flex-col p-0 overflow-hidden'>
          {/* Header Section */}
          <div className='px-3 pt-4 pb-3'>
            <div className='text-center mb-2'>
              <h2 className='text-lg md:text-xl font-semibold text-cyan-800 whitespace-nowrap'>
                Ближайший вебинар
              </h2>
            </div>
            <div className='h-0.5 bg-cyan-200'></div>
          </div>

          {/* Video Section */}
          <div className='px-3 pb-3'>
            <div className='relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100' style={{ aspectRatio: '16/9' }}>
              <iframe
                src='https://www.youtube.com/embed/7RhFlrACEbI?start=4972&autoplay=0&controls=1&modestbranding=1'
                className='w-full h-full absolute inset-0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='Ближайший вебинар'
              ></iframe>
            </div>
          </div>

          {/* Timer Section - по центру под видео */}
          <div className='px-3 pb-3'>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 w-full'>
                <svg className='w-3 h-3 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='flex-1'>{timeLeft || 'Загрузка...'}</span>
              </div>
              <Link
                to='/schedule'
                className='flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 hover:bg-gray-200 transition w-full'
              >
                <svg className='w-3 h-3 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
                <span className='flex-1'>Расписание</span>
                <svg className='w-3 h-3 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24' style={{ transform: 'rotate(-90deg)' }}>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                </svg>
              </Link>
            </div>
          </div>

          {/* Description Section */}
          <div className='px-3 pb-4'>
            <h3 className='text-sm font-semibold text-gray-700 mb-1'>
              О чем это занятие:
            </h3>
            <p className='text-xs text-gray-600 leading-relaxed'>
              Разберем все модальные глаголы для ЕГЭ, изучим разницу между различными видами конструкций и рассмотрим задания 19-24 на реальных ЕГЭ
            </p>
          </div>
        </Card>

        {/* Module 2 */}
        <Card className='h-full flex flex-col'>
          <h2 className='text-2xl font-semibold text-cyan-800 mb-4'>Модуль 2</h2>
          <p className='text-gray-600 mb-4 flex-1'>
            Здесь будет расположен ваш второй модуль
          </p>
          <div className='flex gap-3 flex-wrap mt-auto'>
            <Link
              to='/courses'
              className='px-5 py-3 rounded-xl border border-cyan-300 hover:bg-cyan-50 transition'
            >
              Открыть курсы
            </Link>
          </div>
        </Card>

        {/* Module 3 */}
        <Card className='h-full flex flex-col'>
          <h2 className='text-2xl font-semibold text-cyan-800 mb-4'>Модуль 3</h2>
          <p className='text-gray-600 mb-4 flex-1'>
            Здесь будет расположен ваш третий модуль
          </p>
          <div className='flex gap-3 flex-wrap mt-auto'>
            {!user && (
              <Link
                to='/login'
                className='px-5 py-3 rounded-xl border border-cyan-300 hover:bg-cyan-50 transition'
              >
                Войти / Регистрация
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
