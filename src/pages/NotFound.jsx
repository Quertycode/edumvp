import Card from '../components/Card'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return(<Card title='Страница не найдена'>
    <p className='text-gray-600 mb-3'>Похоже, такой страницы нет.</p>
    <Link to='/' className='px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition'>На главную</Link>
  </Card>)
}