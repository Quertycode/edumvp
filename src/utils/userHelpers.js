/**
 * Утилиты для работы с пользователями
 */

export function getDisplayName(user, fullUser) {
  if (!user) return { firstName: '', lastName: '' }
  const first = fullUser?.firstName || user.firstName || ''
  const last = fullUser?.lastName || user.lastName || ''
  return { firstName: first, lastName: last }
}

export function getGreetingName(user, fullUser) {
  if (!user) return ''
  const fullName = [fullUser?.firstName || user.firstName, fullUser?.lastName || user.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()
  return fullName || fullUser?.email || user.email || user.username
}

/**
 * Маппинг направлений (directions) в предметы (subjects)
 */
export const AVAILABLE_DIRECTIONS = [
  { id: 'math-profile', name: 'Математика (профильная)', examType: 'EGE', subjectKey: 'math' },
  { id: 'math-base', name: 'Математика (базовая)', examType: 'EGE', subjectKey: 'math' },
  { id: 'biology', name: 'Биология', examType: 'EGE', subjectKey: 'biology' },
  { id: 'russian', name: 'Русский язык', examType: 'EGE', subjectKey: 'russian' },
  { id: 'history', name: 'История', examType: 'EGE', subjectKey: 'history' },
  { id: 'english', name: 'Английский язык', examType: 'EGE', subjectKey: 'english' },
]

/**
 * Получить subjectKey по directionId
 */
export function getSubjectKeyByDirectionId(directionId) {
  const direction = AVAILABLE_DIRECTIONS.find(d => d.id === directionId)
  return direction?.subjectKey || null
}

/**
 * Получить direction по ID
 */
export function getDirectionById(directionId) {
  return AVAILABLE_DIRECTIONS.find(d => d.id === directionId) || null
}

/**
 * Получить направления пользователя с маппингом на предметы
 */
export function getUserDirectionsWithSubjects(userDirections = []) {
  return userDirections
    .map(id => {
      const direction = getDirectionById(id)
      return direction ? {
        id: direction.id,
        name: direction.name,
        subjectKey: direction.subjectKey
      } : null
    })
    .filter(Boolean)
}

