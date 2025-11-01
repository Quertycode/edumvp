import { useState } from 'react'
import Card from '../../../components/Card'
import { upsertUser } from '../../../utils/userStore'
import { AVAILABLE_DIRECTIONS, getUserDirectionsWithSubjects } from '../../../utils/userHelpers'

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
  const [isEditingDirections, setIsEditingDirections] = useState(false)
  const [selectedDirections, setSelectedDirections] = useState(user?.directions || [])

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

  const handleDirectionsSave = () => {
    if (selectedDirections.length === 0) {
      alert('Выберите хотя бы один предмет')
      return
    }
    
    if (fullUser) {
      const updatedUser = { ...fullUser, directions: selectedDirections }
      upsertUser(updatedUser)
      window.location.reload()
    }
    setIsEditingDirections(false)
  }

  const toggleDirection = (directionId) => {
    setSelectedDirections(prev =>
      prev.includes(directionId)
        ? prev.filter(id => id !== directionId)
        : [...prev, directionId]
    )
  }

  const getAvatarInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || ''
    const last = lastName?.charAt(0)?.toUpperCase() || ''
    return first + last || '?'
  }

  const userDirections = getUserDirectionsWithSubjects(user?.directions || [])

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
          {(fullUser?.grade || fullUser?.grade === null) && (
            <div>
              Класс: <b>{fullUser.grade === null ? 'Выпускник' : fullUser.grade}</b>
            </div>
          )}
          <div>
            Роль: <b>{user?.role || 'guest'}</b>
          </div>
        </div>
      </div>
      
      <div className='mb-4'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='font-semibold text-gray-700'>Предметы</h3>
          <button
            onClick={() => setIsEditingDirections(!isEditingDirections)}
            className='text-sm text-cyan-600 hover:text-cyan-700'
          >
            {isEditingDirections ? 'Отмена' : 'Изменить'}
          </button>
        </div>
        
        {isEditingDirections ? (
          <div className='space-y-3'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {AVAILABLE_DIRECTIONS.map((direction) => (
                <button
                  key={direction.id}
                  type='button'
                  onClick={() => toggleDirection(direction.id)}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition text-left ${
                    selectedDirections.includes(direction.id)
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-gray-300 hover:border-cyan-300 text-gray-700'
                  }`}
                >
                  {direction.name}
                </button>
              ))}
            </div>
            <button
              onClick={handleDirectionsSave}
              className='px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition'
            >
              Сохранить
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {userDirections.length > 0 ? (
              userDirections.map((dir) => (
                <div
                  key={dir.id}
                  className='px-3 py-2 bg-cyan-50 border border-cyan-200 rounded-lg text-sm font-medium'
                >
                  {dir.name}
                </div>
              ))
            ) : (
              <div className='text-gray-500 text-sm'>Предметы не выбраны</div>
            )}
          </div>
        )}
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

