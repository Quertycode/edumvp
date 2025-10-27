import Card from '../components/Card'
import { useEffect, useState } from 'react'
import {
  deleteUser,
  getUsers,
  initStore,
  setAccess,
  updateUserRole,
  upsertUser
} from '../utils/userStore'

const emptyForm = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  role: 'guest'
}

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState(emptyForm)

  const reload = () => setUsers(getUsers())

  useEffect(() => {
    initStore()
    reload()
  }, [])

  const createOrUpdate = () => {
    if (!form.email.trim() || !form.password.trim()) return
    upsertUser({
      email: form.email,
      username: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      birthdate: form.birthdate,
      role: form.role
    })
    setForm(emptyForm)
    reload()
  }

  const toggleAccess = (user, subject) => {
    const access = {
      ...(user.access || { math: { enabled: false }, russian: { enabled: false } })
    }
    access[subject] = { enabled: !(access[subject]?.enabled) }
    setAccess(user.username, access)
    reload()
  }

  return (
    <div className='space-y-6'>
      <Card title='Создание / обновление пользователя'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          <input
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder='Электронная почта'
            className='border border-cyan-300 rounded-lg px-3 py-2'
            type='email'
          />
          <input
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder='Пароль'
            className='border border-cyan-300 rounded-lg px-3 py-2'
            type='password'
          />
          <input
            value={form.firstName}
            onChange={(event) => setForm({ ...form, firstName: event.target.value })}
            placeholder='Имя'
            className='border border-cyan-300 rounded-lg px-3 py-2'
            type='text'
          />
          <input
            value={form.lastName}
            onChange={(event) => setForm({ ...form, lastName: event.target.value })}
            placeholder='Фамилия'
            className='border border-cyan-300 rounded-lg px-3 py-2'
            type='text'
          />
          <input
            value={form.birthdate}
            onChange={(event) => setForm({ ...form, birthdate: event.target.value })}
            placeholder='Дата рождения'
            className='border border-cyan-300 rounded-lg px-3 py-2'
            type='date'
          />
          <select
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
            className='border border-cyan-300 rounded-lg px-3 py-2'
          >
            <option value='guest'>guest</option>
            <option value='student'>student</option>
            <option value='admin'>admin</option>
          </select>
        </div>
        <div className='mt-3'>
          <button
            onClick={createOrUpdate}
            className='px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition'
          >
            Сохранить
          </button>
        </div>
      </Card>

      <Card title='Пользователи'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='text-left text-gray-500'>
                <th className='py-2'>Имя</th>
                <th className='py-2'>Почта</th>
                <th>Роль</th>
                <th>Русский</th>
                <th>Математика</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
                return (
                  <tr key={user.username} className='border-t'>
                    <td className='py-2'>{name || '—'}</td>
                    <td className='py-2'>{user.email || user.username}</td>
                    <td>
                      <select
                        defaultValue={user.role}
                        onChange={(event) => {
                          updateUserRole(user.username, event.target.value)
                          reload()
                        }}
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
                          onChange={() => toggleAccess(user, 'russian')}
                        />
                        <span>Русский</span>
                      </label>
                    </td>
                    <td>
                      <label className='inline-flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={user.access?.math?.enabled || false}
                          onChange={() => toggleAccess(user, 'math')}
                        />
                        <span>Математика</span>
                      </label>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteUser(user.username)
                          reload()
                        }}
                        className='px-3 py-1 rounded bg-rose-600 text-white hover:bg-rose-700'
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
