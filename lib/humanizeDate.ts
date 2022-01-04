import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'

const humanizeDate = (isoDate: string, dateFormat = 'PPPP') => {
  try {
    return format(parseISO(isoDate), dateFormat, { locale: nb })
  } catch (e) {
    return ''
  }
}
export default humanizeDate
