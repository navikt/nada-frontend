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

const stringToColors = (str: string): [string, string] => {
  let hash = 0
  //make sure same keyword get same color
  let trimed = str.replace(/\s/g, '').toLocaleLowerCase()
  for (let i = 0; i < trimed.length; i++) {
    hash += trimed.charCodeAt(i)
  }
  let colorIndex = hash % stringBgColors.length
  return [stringBgColors[colorIndex], stringBorderColors[colorIndex]]
}

export default stringToColors
