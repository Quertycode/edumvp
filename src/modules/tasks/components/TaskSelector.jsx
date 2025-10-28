/**
 * Селектор предмета и кнопка случайного вопроса
 * @param {string} subject - Текущий предмет
 * @param {function} onSubjectChange - Функция смены предмета
 * @param {function} onRandomTask - Функция получения случайного задания
 */
export default function TaskSelector({ subject, onSubjectChange, onRandomTask }) {
  return (
    <div className='flex flex-wrap gap-3 mb-3'>
      <button 
        onClick={() => onSubjectChange('math')} 
        className={`px-4 py-2 rounded-xl border ${
          subject === 'math' 
            ? 'bg-cyan-600 text-white' 
            : 'border-cyan-300 hover:bg-cyan-50'
        }`}
      >
        Математика
      </button>
      <button 
        onClick={() => onSubjectChange('russian')} 
        className={`px-4 py-2 rounded-xl border ${
          subject === 'russian' 
            ? 'bg-cyan-600 text-white' 
            : 'border-cyan-300 hover:bg-cyan-50'
        }`}
      >
        Русский язык
      </button>
      <button 
        onClick={onRandomTask} 
        className='px-4 py-2 rounded-xl border border-cyan-300 hover:bg-cyan-50'
      >
        Случайный вопрос
      </button>
    </div>
  )
}

