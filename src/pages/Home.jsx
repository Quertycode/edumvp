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
    <div className='h-full flex flex-col min-h-0'>
      {/* Three Module Boxes */}
      <div className='grid grid-cols-[3fr_4fr_3fr] gap-2 flex-1 min-h-0'>
        {/* Module 1 - Ближайший вебинар */}
        <Card className='h-full flex flex-col p-0 overflow-hidden'>
          {/* Header Section */}
          <div className='px-6 pt-0 pb-4'>
            <div className='grid grid-cols-[1fr_auto_1fr] gap-2 mb-3 items-baseline'>
              <div></div>
              <h2 className='text-2xl font-semibold text-cyan-800'>
                Ближайший вебинар
              </h2>
              <Link
                to='/schedule'
                className='text-gray-500 hover:text-cyan-600 transition flex items-center gap-1 text-xs whitespace-nowrap justify-end relative -top-0.5'
              >
                Расписание
                <span>→</span>
              </Link>
            </div>
            <div className='h-0.5 bg-cyan-200'></div>
          </div>

          {/* Video Section */}
          <div className='px-6 pb-4'>
            <div className='relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100'
              style={{ aspectRatio: '16/9' }}>
              <iframe
                src='https://www.youtube.com/embed/7RhFlrACEbI?start=4972&autoplay=0&controls=1&modestbranding=1'
                className='w-full h-full absolute inset-0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='Ближайший вебинар'
              ></iframe>
            </div>
          </div>

          {/* Footer Section */}
          <div className='px-6 pb-6 mt-auto'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-sm font-semibold text-gray-700'>
                О чем это занятие
              </h3>
              <div className='flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-600'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='whitespace-nowrap'>{timeLeft || 'Загрузка...'}</span>
              </div>
            </div>
            <p className='text-xs text-gray-600'>
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
