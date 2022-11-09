const stringBgColors = [
  'bg-limegreen-100',
  'bg-green-100',
  'bg-orange-100',
  'bg-deepblue-100',
  'bg-purple-100',
  'bg-gray-100',
]

const stringBorderColors = [
  'border-limegreen-300',
  'border-green-300',
  'border-orange-300',
  'border-deepblue-300',
  'border-purple-300',
  'border-gray-300',
]

const colorClassMap = new Map([
  ['bg-limegreen-100', '#ecfccb'],
  ['bg-green-100', '#dcfce7'],
  ['bg-orange-100', '#ffedd5'],
  ['bg-deepblue-100', '#dbeafe'],
  ['bg-purple-100', '#f3e8ff'],
  ['bg-gray-100', '#f3f4f6'],
  ['border-limegreen-300', '#bef264'],
  ['border-green-300', '#86efac'],
  ['border-orange-300', '#fdba74'],
  ['border-deepblue-300', '#93c5fd'],
  ['border-purple-300', '#d8b4fe'],
  ['border-gray-300', '#d1d5db'],
])

export const stringToColorClasses = (str: string): [string, string] => {
  let hash = 0
  //make sure same keyword get same color
  let trimed = str.replace(/\s/g, '').toLocaleLowerCase()
  for (let i = 0; i < trimed.length; i++) {
    hash += trimed.charCodeAt(i)
  }
  let colorIndex = hash % stringBgColors.length
  return [stringBgColors[colorIndex], stringBorderColors[colorIndex]]
}

export const stringToColors = (str: string): [string, string] =>
  stringToColorClasses(str).map((it) => colorClassMap.get(it)) as [string, string]

export const truncate = (str: string, length: number) =>
  str.substring(0, Math.min(str.length, length)) +
  (str.length > length ? '...' : '')
