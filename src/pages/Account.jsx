import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { getCurrentUser, getStats, getUserFull, logout, upsertUser } from '../utils/userStore'

const formatBirthdate = (value) => {
  if (!value) return '—'
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return value
  return `${day}.${month}.${year}`
}

export default function Account() {
  const user = getCurrentUser()
  const identifier = user?.username || user?.email || 'guest-anon'
  const fullUser = user?.username ? getUserFull(user.username) : null

  const email = fullUser?.email || user?.email || '—'
  const firstName = fullUser?.firstName || user?.firstName || ''
  const lastName = fullUser?.lastName || user?.lastName || ''
  const displayName = [firstName, lastName].filter(Boolean).join(' ').trim() || '—'
  const birthdate = formatBirthdate(fullUser?.birthdate || user?.birthdate || '')
  const currentAvatar = fullUser?.avatar || user?.avatar || ''

  const [avatar, setAvatar] = useState(currentAvatar)
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar)

  const stats = getStats(identifier)
  const percent = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setAvatar(base64String)
      setAvatarPreview(base64String)
      
      // Сохраняем аватар в профиль
      if (fullUser) {
        const updatedUser = { ...fullUser, avatar: base64String }
        upsertUser(updatedUser)
        window.location.reload() // Обновляем страницу чтобы изменения отобразились
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAvatarRemove = () => {
    setAvatar('')
    setAvatarPreview('')
    if (fullUser) {
      const updatedUser = { ...fullUser, avatar: '' }
      upsertUser(updatedUser)
      window.location.reload()
    }
  }

  const subjectEntries = Object.entries(stats.subjects)

  const getAvatarInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || ''
    const last = lastName?.charAt(0)?.toUpperCase() || ''
    return first + last || '?'
  }

  return (
    <div className='space-y-4'>
      <Card title='Профиль'>
        <div className='flex items-start gap-6 mb-4'>
          <div className='flex flex-col items-center gap-2'>
            {avatarPreview ? (
              <img src={avatarPreview} alt='Avatar' className='w-24 h-24 rounded-full object-cover border-2 border-cyan-500' />
            ) : (
              <div className='w-24 h-24 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-semibold'>
                {getAvatarInitials(firstName, lastName)}
              </div>
            )}
            <div className='flex gap-2'>
              <label className='cursor-pointer px-3 py-1.5 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition'>
                Загрузить
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarUpload}
                  className='hidden'
                />
              </label>
              {avatarPreview && (
                <button
                  onClick={handleAvatarRemove}
                  className='px-3 py-1.5 text-sm bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition'
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
          <div className='text-gray-700 space-y-1'>
            <div>
              Имя: <b>{displayName}</b>
            </div>
            <div>
              Электронная почта: <b>{email}</b>
            </div>
            <div>
              Дата рождения: <b>{birthdate}</b>
            </div>
            <div>
              Роль: <b>{user?.role || 'guest'}</b>
            </div>
          </div>
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition'
          >
            Выйти из аккаунта
          </button>
        )}
      </Card>

      <Card title='Статистика'>
        <div className='flex flex-wrap gap-4'>
          <div className='px-4 py-3 rounded-xl bg-cyan-50 border border-cyan-200'>
            Всего попыток: <b>{stats.total}</b>
          </div>
          <div className='px-4 py-3 rounded-xl bg-cyan-50 border border-cyan-200'>
            Верных ответов: <b>{stats.correct}</b>
          </div>
          <div className='px-4 py-3 rounded-xl bg-cyan-50 border border-cyan-200'>
            Успеваемость: <b>{percent}%</b>
          </div>
        </div>
        <div className='mt-4'>
          <h3 className='font-semibold mb-2'>По предметам</h3>
          <div className='grid sm:grid-cols-2 gap-3'>
            {subjectEntries.map(([subject, summary]) => {
              const subjectPercent = summary.total
                ? Math.round((summary.correct / summary.total) * 100)
                : 0
              const subjectLabel = subject === 'math' ? 'Математика' : 'Русский язык'
              return (
                <div key={subject} className='border border-cyan-200 rounded-xl p-3'>
                  <div className='mb-1 font-medium'>{subjectLabel}</div>
                  <div className='text-sm text-gray-600'>
                    Попыток: {summary.total}, верных: {summary.correct}, успеваемость:{' '}
                    {subjectPercent}%
                  </div>
                </div>
              )
            })}
            {subjectEntries.length === 0 && (
              <div className='text-gray-500'>
                Статистика пока пустая: решите несколько заданий, чтобы увидеть прогресс.
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
