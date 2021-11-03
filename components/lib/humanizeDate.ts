import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'

const humanizeDate = (isoDate: string) => {
  try {
    return format(parseISO(isoDate), 'PPPP', { locale: nb })
  } catch (e) {
    return ''
  }
}
export default humanizeDate
