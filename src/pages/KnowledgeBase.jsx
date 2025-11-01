import { useParams, Navigate } from 'react-router-dom'
import Card from '../components/Card'
import coursesData from '../data/courses.json'

export default function KnowledgeBase() {
  const { subject } = useParams()
  
  // Проверяем, существует ли предмет
  if (!coursesData[subject]) {
    return <Navigate to='/404' replace />
  }
  
  const subjectNames = {
    math: 'Математика',
    russian: 'Русский язык',
    biology: 'Биология',
    history: 'История',
    english: 'Английский язык'
  }
  
  const subjectName = subjectNames[subject] || subject
  
  return (
    <div className='space-y-6'>
      <Card>
        <h1 className='text-3xl font-bold text-cyan-800 mb-4'>
          Материалы по предмету: {subjectName}
        </h1>
        <p className='text-gray-600 mb-4'>
          Здесь будут храниться учебные материалы и ресурсы по {subjectName.toLowerCase()}.
        </p>
        <p className='text-gray-500 text-sm'>
          Контент скоро будет добавлен...
        </p>
      </Card>
    </div>
  )
}

