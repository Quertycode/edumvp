import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { getCurrentUser, initStore, login, register } from '../utils/userStore'

export default function Login() {
  const [isReg, setIsReg] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    initStore()
  }, [])

  useEffect(() => {
    const user = getCurrentUser()
    if (user) navigate('/')
  }, [navigate])

  const submit = (event) => {
    event.preventDefault()
    setError('')
    const normalizedEmail = email.trim().toLowerCase()

    try {
      if (isReg) {
        register(
          normalizedEmail,
          password.trim(),
          firstName.trim(),
          lastName.trim(),
          birthdate
        )
      } else {
        login(normalizedEmail, password.trim())
      }
      navigate('/')
    } catch (err) {
      setError(err.message || 'Ошибка')
    }
  }

  const toggleMode = () => {
    setIsReg(!isReg)
    setError('')
    if (isReg) {
      setFirstName('')
      setLastName('')
      setBirthdate('')
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <Card title={isReg ? 'Регистрация' : 'Вход'}>
        <form onSubmit={submit} className='space-y-3'>
          <input
            type='email'
            placeholder='Электронная почта'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='w-full border border-cyan-300 rounded-lg px-3 py-2'
            required
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='w-full border border-cyan-300 rounded-lg px-3 py-2'
            required
          />
          {isReg && (
            <>
              <input
                type='text'
                placeholder='Имя'
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className='w-full border border-cyan-300 rounded-lg px-3 py-2'
                required
              />
              <input
                type='text'
                placeholder='Фамилия'
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className='w-full border border-cyan-300 rounded-lg px-3 py-2'
                required
              />
              <input
                type='date'
                placeholder='Дата рождения'
                value={birthdate}
                onChange={(event) => setBirthdate(event.target.value)}
                className='w-full border border-cyan-300 rounded-lg px-3 py-2'
                required
              />
            </>
          )}
          {error && <div className='text-rose-600 text-sm'>{error}</div>}
          <button
            type='submit'
            className='w-full px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition'
          >
            {isReg ? 'Зарегистрироваться' : 'Войти'}
          </button>
          <button
            type='button'
            onClick={toggleMode}
            className='w-full px-4 py-2 rounded-xl border border-cyan-300 hover:bg-cyan-50 transition'
          >
            {isReg ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </button>
          <div className='text-xs text-gray-500'>
            Подсказка: тестовые данные — <b>admin@example.com / admin</b>
          </div>
        </form>
      </Card>
    </div>
  )
}
