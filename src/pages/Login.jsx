import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { getCurrentUser, initStore, login, register } from '../utils/userStore'
import { createTestNotifications } from '../utils/addTestNotifications'

const AVAILABLE_DIRECTIONS = [
  { id: 'math-profile', name: 'Математика (профильная)', examType: 'EGE' },
  { id: 'math-base', name: 'Математика (базовая)', examType: 'EGE' },
  { id: 'biology', name: 'Биология', examType: 'EGE' },
  { id: 'russian', name: 'Русский язык', examType: 'EGE' },
  { id: 'history', name: 'История', examType: 'EGE' },
  { id: 'english', name: 'Английский язык', examType: 'EGE' },
]

export default function Login() {
  const [isReg, setIsReg] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [grade, setGrade] = useState(null)
  const [selectedDirections, setSelectedDirections] = useState([])
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
          grade,
          selectedDirections
        )
      } else {
        login(normalizedEmail, password.trim())
      }
      
      // Добавляем тестовые уведомления при входе
      createTestNotifications(normalizedEmail)
      
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
      setGrade(null)
      setSelectedDirections([])
    }
  }

  const toggleDirection = (directionId) => {
    setSelectedDirections((prev) =>
      prev.includes(directionId)
        ? prev.filter((id) => id !== directionId)
        : [...prev, directionId]
    )
  }

  return (
    <div className={`mx-auto w-full px-4 md:px-0 ${isReg ? 'max-w-2xl' : 'max-w-md'}`}>
      <Card title=''>
        <h2 className='text-xl font-bold text-center text-cyan-700 mb-3'>
          {isReg ? 'Регистрация' : 'Вход'}
        </h2>
        <form onSubmit={submit} className='space-y-4'>
          {isReg && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <input
                  type='text'
                  placeholder='Имя'
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className='w-full border border-cyan-300 rounded-lg px-3 py-2 text-sm'
                  required
                />
                <input
                  type='text'
                  placeholder='Фамилия'
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className='w-full border border-cyan-300 rounded-lg px-3 py-2 text-sm'
                  required
                />
              </div>
            </>
          )}
          <input
            type='email'
            placeholder='Электронная почта'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='w-full border border-cyan-300 rounded-lg px-3 py-2 text-sm'
            required
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='w-full border border-cyan-300 rounded-lg px-3 py-2 text-sm'
            required
          />
          {isReg && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Класс <span className='text-red-500'>*</span>
                </label>
                <div className='grid grid-cols-4 gap-2'>
                  {[8, 9, 10, 11].map((gradeNum) => (
                    <button
                      key={gradeNum}
                      type='button'
                      onClick={() => setGrade(gradeNum)}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition ${
                        grade === gradeNum
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-300 hover:border-cyan-300 text-gray-700'
                      }`}
                    >
                      {gradeNum} класс
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Предметы <span className='text-red-500'>*</span>
                  <span className='text-xs text-gray-500 ml-2'>(можно выбрать несколько)</span>
                </label>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  {AVAILABLE_DIRECTIONS.map((direction) => (
                    <button
                      key={direction.id}
                      type='button'
                      onClick={() => toggleDirection(direction.id)}
                      className={`px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition text-left ${
                        selectedDirections.includes(direction.id)
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-300 hover:border-cyan-300 text-gray-700'
                      }`}
                    >
                      {direction.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          {error && <div className='text-rose-600 text-sm bg-rose-50 px-3 py-2 rounded-lg'>{error}</div>}
          <button
            type='submit'
            className='w-full px-4 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition'
          >
            {isReg ? 'Зарегистрироваться' : 'Войти'}
          </button>
          <button
            type='button'
            onClick={toggleMode}
            className='w-full px-4 py-2.5 rounded-xl border border-cyan-300 hover:bg-cyan-50 transition font-medium'
          >
            {isReg ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </button>
          {!isReg && (
            <div className='text-xs text-gray-500 text-center'>
              Подсказка: тестовые данные — <b>admin@example.com / admin</b>
            </div>
          )}
        </form>
      </Card>
    </div>
  )
}
