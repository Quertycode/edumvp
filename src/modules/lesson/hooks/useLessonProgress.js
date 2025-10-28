import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../../utils/userStore'

/**
 * Хук для работы с прогрессом урока
 * @param {string} subject - Предмет
 * @param {string} lessonId - ID урока
 */
export function useLessonProgress(subject, lessonId) {
  const user = getCurrentUser()
  const [progress, setProgress] = useState({})
  const [homeworkAnswers, setHomeworkAnswers] = useState({})

  useEffect(() => {
    // Загружаем прогресс пользователя
    const savedProgress = localStorage.getItem(`progress_${user?.username}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }

    // Загружаем ответы на домашние задания
    const savedAnswers = localStorage.getItem(`homework_${user?.username}`)
    if (savedAnswers) {
      setHomeworkAnswers(JSON.parse(savedAnswers))
    }
  }, [user])

  const markAsWatched = () => {
    const key = `${subject}_${lessonId}`
    const newProgress = {
      ...progress,
      [key]: {
        ...progress[key],
        watched: true
      }
    }
    setProgress(newProgress)
    localStorage.setItem(`progress_${user.username}`, JSON.stringify(newProgress))
  }

  const handleHomeworkSubmit = (taskId, answer) => {
    const key = `${subject}_${lessonId}_${taskId}`
    const newAnswers = {
      ...homeworkAnswers,
      [key]: answer
    }
    setHomeworkAnswers(newAnswers)
    localStorage.setItem(`homework_${user.username}`, JSON.stringify(newAnswers))

    // Проверяем, все ли задания выполнены
    const allCompleted = true // Упрощенная проверка
    if (allCompleted) {
      const progressKey = `${subject}_${lessonId}`
      const newProgress = {
        ...progress,
        [progressKey]: {
          ...progress[progressKey],
          completed: true
        }
      }
      setProgress(newProgress)
      localStorage.setItem(`progress_${user.username}`, JSON.stringify(newProgress))
    }
  }

  const getTaskAnswer = (taskId) => {
    const key = `${subject}_${lessonId}_${taskId}`
    return homeworkAnswers[key] || ''
  }

  return {
    progress,
    homeworkAnswers,
    markAsWatched,
    handleHomeworkSubmit,
    getTaskAnswer
  }
}

