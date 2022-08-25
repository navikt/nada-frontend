import { theme } from '@navikt/ds-tailwind'

const stringBgColors = [
  'limegreen-100',
  'green-100',
  'orange-100',
  'deepblue-100',
  'purple-100',
  'gray-100',
]

const stringBorderColors = [
  'limegreen-300',
  'green-300',
  'orange-300',
  'deepblue-300',
  'purple-300',
  'gray-300',
]

const stringToColors = (str: string): [string, string] => {
  let hash = 0
  //make sure same keyword get same color
  let trimed = str.replace(/\s/g, '').toLocaleLowerCase()
  for (let i = 0; i < trimed.length; i++) {
    hash += trimed.charCodeAt(i)
  }
  let colorIndex = hash % stringBgColors.length
  return [
    theme.colors[stringBgColors[colorIndex]],
    theme.colors[stringBorderColors[colorIndex]],
  ]
}

export default stringToColors
