import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import BackButton from './components/BackButton'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseLessons from './pages/CourseLessons'
import LessonDetails from './pages/LessonDetails'
import Tasks from './pages/Tasks'
import Account from './pages/Account'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import KnowledgeBase from './pages/KnowledgeBase'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gradient-to-b from-cyan-50 to-white text-gray-800 flex flex-col'>
        <Header />
        <BackButton />
        <main className='max-w-6xl mx-auto flex-1 flex flex-col'>
          <div className='flex-1 p-6'>
            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/account' element={<Account />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/knowledge-base' element={<KnowledgeBase />} />
            <Route 
              path='/courses/:subject' 
              element={
                <ProtectedRoute roles={['student', 'admin']}>
                  <CourseLessons />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/courses/:subject/:lessonId' 
              element={
                <ProtectedRoute roles={['student', 'admin']}>
                  <LessonDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/admin' 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/404' replace />} />
            </Routes>
          </div>
        </main>
        <footer className='text-center py-6 text-cyan-700/80 text-sm border-t border-cyan-100'>
          © {new Date().getFullYear()} Эврика!
        </footer>
      </div>
    </BrowserRouter>
  )
}
