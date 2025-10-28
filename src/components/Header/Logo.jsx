import { Link } from 'react-router-dom'

/**
 * Логотип приложения
 */
export default function Logo() {
  return (
    <Link to='/' className='font-bold text-xl md:text-2xl text-orange-500 hover:text-orange-600 transition-all cursor-pointer'>
      Эврика!
    </Link>
  )
}

