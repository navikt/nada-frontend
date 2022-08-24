import { theme } from '@navikt/ds-tailwind'

const keywordColors = [
  'limegreen-100',
  'green-100',
  'orange-100',
  'deepblue-100',
  'purple-100',
  'gray-100',
]

const StringToColor = (str: string) => {
  let hash = 0
  //make sure same keyword get same color
  let trimed = str.replace(/\s/g, '').toLocaleLowerCase()
  for (let i = 0; i < trimed.length; i++) {
    hash += trimed.charCodeAt(i)
  }
  return theme.colors[keywordColors[hash % keywordColors.length]]
}

export default StringToColor
