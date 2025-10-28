import { useState } from 'react'
import Card from '../../../components/Card'
import { upsertUser } from '../../../utils/userStore'

/**
 * Карточка профиля пользователя
 */
export default function ProfileCard({ user, fullUser, onLogout }) {
  const email = fullUser?.email || user?.email || '—'
  const firstName = fullUser?.firstName || user?.firstName || ''
  const lastName = fullUser?.lastName || user?.lastName || ''
  const displayName = [firstName, lastName].filter(Boolean).join(' ').trim() || '—'
  const currentAvatar = fullUser?.avatar || user?.avatar || ''

  const [avatar, setAvatar] = useState(currentAvatar)
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar)

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
      
      if (fullUser) {
        const updatedUser = { ...fullUser, avatar: base64String }
        upsertUser(updatedUser)
        window.location.reload()
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

  const getAvatarInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || ''
    const last = lastName?.charAt(0)?.toUpperCase() || ''
    return first + last || '?'
  }

  const formatBirthdate = (value) => {
    if (!value) return '—'
    const [year, month, day] = value.split('-')
    if (!year || !month || !day) return value
    return `${day}.${month}.${year}`
  }

  const birthdate = formatBirthdate(fullUser?.birthdate || user?.birthdate || '')

  return (
    <Card title='Профиль'>
      <div className='flex items-start gap-6 mb-4 flex-col sm:flex-row'>
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
          onClick={onLogout}
          className='px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition'
        >
          Выйти из аккаунта
        </button>
      )}
    </Card>
  )
}

