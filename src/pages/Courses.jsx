import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { getCurrentUser, getUserFull } from '../utils/userStore'

export default function Courses() {
  const user = getCurrentUser()
  const full = user ? getUserFull(user.username) : null

  if (!user) {
    return <Card title='Предметы недоступны'>Пожалуйста, войдите в систему.</Card>
  }

  if (user.role === 'guest') {
    return <Card title='Предметы недоступны для гостя'>Чтобы получить доступ к предметам, оформите доступ или дождитесь активации админом.</Card>
  }

  const items = [
    { key: 'russian', title: 'Русский язык' },
    { key: 'math', title: 'Математика' }
  ]

  return (
    <div className='space-y-4'>
      <Card title='Предметы'>
        <div className='grid sm:grid-cols-2 gap-4'>
          {items.map(c => {
            const allowed = full?.access?.[c.key]?.enabled
            return (
              <div key={c.key} className='border border-cyan-200 rounded-2xl p-4 bg-white/90'>
                <div className='font-semibold mb-2'>{c.title}</div>
                <div className='text-sm text-gray-600 mb-3'>
                  {allowed ? 'Доступ открыт' : 'Нет доступа'}
                </div>
                {allowed ? (
                  <Link
                    to={`/courses/${c.key}`}
                    className='inline-block px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition'
                  >
                    Открыть курс
                  </Link>
                ) : (
                  <button
                    disabled
                    className='px-4 py-2 bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed'
                  >
                    Открыть курс
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}