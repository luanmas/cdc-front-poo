export function formatISOToBrazilian(dateString: string) {
  const date = new Date(dateString)

  // Define a timezone para 'America/Sao_Paulo'
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  const formatter = new Intl.DateTimeFormat('pt-BR', options)
  const formattedDate = formatter.format(date)

  const [datePart, timePart] = formattedDate.split(', ')
  const [day, month, year] = datePart.split('/')
  const [hours, minutes] = timePart.split(':')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}
