/**
 * Компонент прогресс-бара
 * @param {number} progress - Прогресс в процентах (0-100)
 */
export default function ProgressBar({ progress = 60 }) {
  return (
    <div className='hidden md:flex items-center gap-2 ml-4'>
      <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div className='h-full bg-cyan-500 rounded-full' style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

