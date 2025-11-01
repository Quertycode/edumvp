import { useState } from 'react'
import { deleteUser, setAccess, updateUserRole, upsertUser } from '../../../utils/userStore'
import { AVAILABLE_DIRECTIONS, getUserDirectionsWithSubjects } from '../../../utils/userHelpers'

/**
 * Строка пользователя в таблице
 * @param {Object} user - Объект пользователя
 * @param {function} onUpdate - Функция обновления
 */
export default function UserRow({ user, onUpdate }) {
  const [isEditingDirections, setIsEditingDirections] = useState(false)
  const [selectedDirections, setSelectedDirections] = useState(user.directions || [])

  const updateUserName = (username, field, value) => {
    const updatedUser = {
      ...user,
      [field]: value
    }
    upsertUser(updatedUser)
    onUpdate()
  }

  const toggleAccess = (subject) => {
    const access = {
      ...(user.access || { math: { enabled: false }, russian: { enabled: false } })
    }
    access[subject] = { enabled: !(access[subject]?.enabled) }
    setAccess(user.username, access)
    onUpdate()
  }

  const handleRoleChange = (newRole) => {
    updateUserRole(user.username, newRole)
    onUpdate()
  }

  const handleDelete = () => {
    deleteUser(user.username)
    onUpdate()
  }

  const handleDirectionsSave = () => {
    const updatedUser = { ...user, directions: selectedDirections }
    upsertUser(updatedUser)
    setIsEditingDirections(false)
    onUpdate()
  }

  const toggleDirection = (directionId) => {
    setSelectedDirections(prev =>
      prev.includes(directionId)
        ? prev.filter(id => id !== directionId)
        : [...prev, directionId]
    )
  }

  const userDirections = getUserDirectionsWithSubjects(user.directions || [])

  return (
    <tr key={user.username} className='border-t'>
      <td className='py-2'>
        <input
          type='text'
          value={user.firstName || ''}
          onChange={(e) => updateUserName(user.username, 'firstName', e.target.value)}
          className='border rounded px-2 py-1 text-sm w-full'
        />
      </td>
      <td className='py-2'>
        <input
          type='text'
          value={user.lastName || ''}
          onChange={(e) => updateUserName(user.username, 'lastName', e.target.value)}
          className='border rounded px-2 py-1 text-sm w-full'
        />
      </td>
      <td className='py-2'>{user.email || user.username}</td>
      <td>
        <select
          defaultValue={user.role}
          onChange={(e) => handleRoleChange(e.target.value)}
          className='border rounded px-2 py-1'
        >
          <option value='guest'>guest</option>
          <option value='student'>student</option>
          <option value='admin'>admin</option>
        </select>
      </td>
      <td>
        <label className='inline-flex items-center gap-2'>
          <input
            type='checkbox'
            checked={user.access?.russian?.enabled || false}
            onChange={() => toggleAccess('russian')}
          />
          <span>Русский</span>
        </label>
      </td>
      <td>
        <label className='inline-flex items-center gap-2'>
          <input
            type='checkbox'
            checked={user.access?.math?.enabled || false}
            onChange={() => toggleAccess('math')}
          />
          <span>Математика</span>
        </label>
      </td>
      <td>
        <button
          onClick={handleDelete}
          className='px-3 py-1 rounded bg-rose-600 text-white hover:bg-rose-700'
        >
          Удалить
        </button>
      </td>
    </tr>
  )
}

