import Card from '../components/Card'
import { useEffect, useState } from 'react'
import { addAnswerResult, getCurrentUser, initStore } from '../utils/userStore'

const BANK = {
  math: [
    { id: 'm1', type: 'single', q: '2 + 2 * 2 = ?', options: ['4', '6', '8'], answer: 1 },
    { id: 'm2', type: 'single', q: 'Корень из 9?', options: ['2', '3', '4'], answer: 1 },
    { id: 'm3', type: 'text', q: 'Напишите формулу площади квадрата' },
  ],
  russian: [
    { id: 'r1', type: 'single', q: "Укажите часть речи: 'красивый'", options: ['существительное', 'прилагательное', 'глагол'], answer: 1 },
    { id: 'r2', type: 'text', q: 'Напишите слово с буквой Ё' },
    { id: 'r3', type: 'single', q: 'Сколько падежей в русском языке?', options: ['5', '6', '7'], answer: 2 },
  ]
}

export default function Tasks() {
  const [subject, setSubject] = useState('math')
  const [current, setCurrent] = useState(null)
  const [input, setInput] = useState('')
  const [chosen, setChosen] = useState(null)
  const [result, setResult] = useState(null)
  
  useEffect(() => { initStore() }, [])
  
  const user = getCurrentUser()
  
  if (!user) {
    return <Card title='Доступ запрещен'>Пожалуйста, войдите в систему для решения заданий.</Card>
  }

  const pool = BANK[subject]
  const nextRandom = () => {
    const idx = Math.floor(Math.random() * pool.length)
    setCurrent(pool[idx])
    setChosen(null)
    setInput('')
    setResult(null)
  }
  
  useEffect(() => { nextRandom() }, [subject])
  
  const submit = () => {
    if (!current) return
    let correct = false
    if (current.type === 'single') correct = chosen === current.answer
    if (current.type === 'text') correct = input.trim().length > 0
    addAnswerResult(user?.username || 'guest-anon', subject, correct)
    setResult(correct ? 'Верно!' : 'Неверно')
  }
  
  if (!current) return <Card>Загрузка...</Card>
  
  return (
    <div className='space-y-4'>
      <Card title='Задания'>
        <div className='flex flex-wrap gap-3 mb-3'>
          <button 
            onClick={() => setSubject('math')} 
            className={`px-4 py-2 rounded-xl border ${
              subject === 'math' 
                ? 'bg-cyan-600 text-white' 
                : 'border-cyan-300 hover:bg-cyan-50'
            }`}
          >
            Математика
          </button>
          <button 
            onClick={() => setSubject('russian')} 
            className={`px-4 py-2 rounded-xl border ${
              subject === 'russian' 
                ? 'bg-cyan-600 text-white' 
                : 'border-cyan-300 hover:bg-cyan-50'
            }`}
          >
            Русский язык
          </button>
          <button 
            onClick={nextRandom} 
            className='px-4 py-2 rounded-xl border border-cyan-300 hover:bg-cyan-50'
          >
            Случайный вопрос
          </button>
        </div>
        <div className='border border-cyan-200 rounded-2xl p-4 bg-white/90'>
          <div className='font-semibold mb-2'>{current.q}</div>
          {current.type === 'single' && (
            <div className='space-y-2'>
              {current.options.map((opt, i) => (
                <label key={i} className='flex gap-2 items-center text-sm'>
                  <input 
                    type='radio' 
                    name='opt' 
                    checked={chosen === i} 
                    onChange={() => setChosen(i)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
          {current.type === 'text' && (
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder='Ваш ответ...' 
              className='w-full border border-cyan-300 rounded-lg px-3 py-2 text-sm'
            />
          )}
          <div className='mt-3 flex items-center gap-3'>
            <button 
              onClick={submit} 
              className='px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition'
            >
              Ответить
            </button>
            {result && (
              <span className={`text-sm ${
                result === 'Верно!' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {result}
              </span>
            )}
            {result && (
              <button 
                onClick={nextRandom} 
                className='ml-auto px-4 py-2 rounded-xl border border-cyan-300 hover:bg-cyan-50'
              >
                Следующий вопрос
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}