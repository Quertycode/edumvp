import { useState, useEffect } from 'react'

/**
 * Хук для отслеживания времени до начала вебинара
 * @param {number} targetDate - Timestamp целевой даты
 * @returns {string} Строка с оставшимся временем
 */
export function useWebinarTimer(targetDate) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const getDeclension = (number, one, two, five) => {
      const n = number % 100
      const n1 = number % 10
      if (n > 10 && n < 20) return five
      if (n1 > 1 && n1 < 5) return two
      if (n1 === 1) return one
      return five
    }

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        
        const daysWord = getDeclension(days, 'день', 'дня', 'дней')
        const hoursWord = getDeclension(hours, 'час', 'часа', 'часов')
        const minutesWord = getDeclension(minutes, 'минута', 'минуты', 'минут')
        
        setTimeLeft(`${days} ${daysWord}, ${hours} ${hoursWord} и ${minutes} ${minutesWord} до начала`)
      } else {
        setTimeLeft('Вебинар уже начался')
      }
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Обновление каждую минуту
    
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

