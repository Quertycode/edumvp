import Card from '../components/Card'

export default function KnowledgeBase() {
  return (
    <div className='space-y-6'>
      <Card>
        <h1 className='text-3xl font-bold text-cyan-800 mb-4'>База знаний</h1>
        <p className='text-gray-600 mb-4'>
          Здесь будут храниться учебные материалы и ресурсы.
        </p>
        <p className='text-gray-500 text-sm'>
          Контент скоро будет добавлен...
        </p>
      </Card>
    </div>
  )
}

