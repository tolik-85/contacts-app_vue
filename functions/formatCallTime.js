export default function formatCallTime(timestamp) {
  const now = new Date()
  const callTime = new Date(timestamp)
  const diffInSeconds = Math.floor((now - callTime) / 1000)

  if (diffInSeconds < 60) {
    return 'Только что'
  }

  const minutes = Math.floor(diffInSeconds / 60)

  if (minutes <= 10) {
    let word = 'минут'

    if (minutes === 1) {
      word = 'минута'
    } else if ([2, 3, 4].includes(minutes)) {
      word = 'минуты'
    }

    return `${minutes} ${word} назад`
  }

  return callTime.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
