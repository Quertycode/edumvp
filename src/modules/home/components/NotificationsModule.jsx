import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../../../utils/userStore'

/**
 * Модуль "Уведомления"
 * Отображает актуальные уведомления для пользователя
 */
export default function NotificationsModule() {
  const user = getCurrentUser()

  return (
    <Card className='h-full flex flex-col'>
      <h2 className='text-xl md:text-2xl font-semibold text-cyan-800 mb-4'>Обновления</h2>
      <p className='text-gray-600 mb-4 flex-1'>
        Получайте уведомления о новых заданиях, курсах и важных событиях платформы
      </p>
      <div className='flex gap-3 flex-wrap mt-auto'>
        {!user && (
          <Link
            to='/login'
            className='px-4 md:px-5 py-2 md:py-3 rounded-xl border border-cyan-300 hover:bg-cyan-50 transition text-sm md:text-base whitespace-nowrap'
          >
            Войти / Регистрация
          </Link>
        )}
      </div>
    </Card>
  )
}

