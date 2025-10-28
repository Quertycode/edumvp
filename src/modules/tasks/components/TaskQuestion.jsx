import { useState, useEffect } from 'react'

/**
 * Компонент вопроса и ответа на задание
 * @param {Object} task - Объект задания
 * @param {string} result - Результат ('Верно!', 'Неверно')
 * @param {function} onSubmit - Функция отправки ответа
 * @param {function} onNext - Функция перехода к следующему вопросу
 */
export default function TaskQuestion({ task, result, onSubmit, onNext }) {
  const [chosen, setChosen] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    setChosen(null)
    setInput('')
  }, [task])

  const handleSubmit = () => {
    if (task.type === 'single') {
      onSubmit(chosen)
    } else {
      onSubmit(input.trim())
    }
  }

  return (
    <div className='border border-cyan-200 rounded-2xl p-4 bg-white/90'>
      <div className='font-semibold mb-2'>{task.q}</div>
      
      {task.type === 'single' && (
        <div className='space-y-2 mb-3'>
          {task.options.map((opt, i) => (
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
      
      {task.type === 'text' && (
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder='Ваш ответ...' 
          className='w-full border border-cyan-300 rounded-lg px-3 py-2 text-sm mb-3'
        />
      )}
      
      <div className='flex items-center gap-3'>
        <button 
          onClick={handleSubmit}
          className='px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition'
        >
          Ответить
        </button>
        
        {result && (
          <>
            <span className={`text-sm ${
              result === 'Верно!' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {result}
            </span>
            <button 
              onClick={onNext}
              className='ml-auto px-4 py-2 rounded-xl border border-cyan-300 hover:bg-cyan-50'
            >
              Следующий вопрос
            </button>
          </>
        )}
      </div>
    </div>
  )
}

