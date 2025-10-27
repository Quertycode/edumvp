import Card from '../components/Card'
import { Link } from 'react-router-dom'
import { getCurrentUser, getUserFull } from '../utils/userStore'

const getGreetingName = (user, fullUser) => {
  if (!user) return ''
  const fullName = [fullUser?.firstName || user.firstName, fullUser?.lastName || user.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()
  return fullName || fullUser?.email || user.email || user.username
}

export default function Home() {
  const user = getCurrentUser()
  const fullUser = user ? getUserFull(user.username) : null
  const name = getGreetingName(user, fullUser)

  return (
    <div className='h-full flex flex-col min-h-0'>
      {/* Three Module Boxes */}
      <div className='grid grid-cols-[3fr_4fr_3fr] gap-2 flex-1 min-h-0'>
        {/* Module 1 */}
        <Card className='h-full flex flex-col'>
          <h2 className='text-xl font-semibold text-cyan-800 mb-4'>Модуль 1</h2>
          <p className='text-gray-600 mb-4 flex-1'>
            Здесь будет расположен ваш первый модуль
          </p>
          <div className='flex gap-3 flex-wrap mt-auto'>
            <Link
              to='/tasks'
              className='px-5 py-3 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition shadow-md'
            >
              Перейти к заданиям
            </Link>
          </div>
        </Card>

        {/* Module 2 */}
        <Card className='h-full flex flex-col'>
          <h2 className='text-xl font-semibold text-cyan-800 mb-4'>Модуль 2</h2>
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
          <h2 className='text-xl font-semibold text-cyan-800 mb-4'>Модуль 3</h2>
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
