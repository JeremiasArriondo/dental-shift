export const formatDate = (date: Date, hour: string) => {
  const [hours, minutes] = hour.split(':')
  date.setHours(
    parseInt(hours, 10) - 3,
    parseInt(minutes, 10),
    parseInt('00', 10)
  )
  return date.toISOString()
}
