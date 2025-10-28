import Card from '../components/Card'
import { useEffect, useState } from 'react'
import { addAnswerResult, getCurrentUser, initStore } from '../utils/userStore'
import TaskSelector from '../modules/tasks/components/TaskSelector'
import TaskQuestion from '../modules/tasks/components/TaskQuestion'

const BANK = {
  math: [
    { id: 'm1', type: 'single', q: '2 + 2 * 2 = ?', options: ['4', '6', '8'], answer: 1 },
    { id: 'm2', type: 'single', q: 'Корень из 9?', options: ['2', '3', '4'], answer: 1 },
    { id: 'm3', type: 'text', q: 'Напишите формулу площади квадрата', answer: null },
  ],
  russian: [
    { id: 'r1', type: 'single', q: "Укажите часть речи: 'красивый'", options: ['существительное', 'прилагательное', 'глагол'], answer: 1 },
    { id: 'r2', type: 'text', q: 'Напишите слово с буквой Ё', answer: null },
    { id: 'r3', type: 'single', q: 'Сколько падежей в русском языке?', options: ['5', '6', '7'], answer: 2 },
  ]
}

/**
 * Страница заданий - композиция модульных компонентов
 * Рефакторинг: Разбита на TaskSelector и TaskQuestion
 */
export default function Tasks() {
  const [subject, setSubject] = useState('math')
  const [current, setCurrent] = useState(null)
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
    setResult(null)
  }
  
  useEffect(() => { nextRandom() }, [subject])
  
  const submit = (answer) => {
    if (!current) return
    let correct = false
    if (current.type === 'single') correct = answer === current.answer
    if (current.type === 'text') correct = answer && answer.length > 0
    addAnswerResult(user?.username || 'guest-anon', subject, correct)
    setResult(correct ? 'Верно!' : 'Неверно')
  }
  
  if (!current) return <Card>Загрузка...</Card>
  
  return (
    <div className='space-y-4'>
      <Card title='Задания'>
        <TaskSelector 
          subject={subject}
          onSubjectChange={setSubject}
          onRandomTask={nextRandom}
        />
        <TaskQuestion
          task={current}
          result={result}
          onSubmit={submit}
          onNext={nextRandom}
        />
      </Card>
    </div>
  )
}